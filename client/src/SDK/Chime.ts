import {
  AudioVideoFacade,
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSession,
  MeetingSessionConfiguration,
  ReconnectingPromisedWebSocket,
} from 'amazon-chime-sdk-js';

import { BASE_API_URL } from '../constants/URLs';

class ChimeSdkWrapper {
  private static WEB_SOCKET_TIMEOUT_MS = 10000;

  logger: ConsoleLogger = new ConsoleLogger('SDK', LogLevel.WARN);

  meetingSession: MeetingSession | null = null;

  audioVideo: AudioVideoFacade | null = null;

  deviceController: DefaultDeviceController | null = null;

  title: string | null = null;

  name: string | null = null;

  region: string | null = null;

  supportedChimeRegions: any[] = [
    { label: 'United States (N. Virginia)', value: 'us-east-1' },
    { label: 'Japan (Tokyo)', value: 'ap-northeast-1' },
    { label: 'Singapore', value: 'ap-southeast-1' },
    { label: 'Australia (Sydney)', value: 'ap-southeast-2' },
    { label: 'Canada', value: 'ca-central-1' },
    { label: 'Germany (Frankfurt)', value: 'eu-central-1' },
    { label: 'Sweden (Stockholm)', value: 'eu-north-1' },
    { label: 'Ireland', value: 'eu-west-1' },
    { label: 'United Kingdom (London)', value: 'eu-west-2' },
    { label: 'France (Paris)', value: 'eu-west-3' },
    { label: 'Brazil (São Paulo)', value: 'sa-east-1' },
    { label: 'United States (Ohio)', value: 'us-east-2' },
    { label: 'United States (N. California)', value: 'us-west-1' },
    { label: 'United States (Oregon)', value: 'us-west-2' },
  ];

  currentAudioInputDevice: any | null = null;

  currentAudioOutputDevice: any | null = null;

  currentVideoInputDevice: any | null = null;

  audioInputDevices: any[] = [];

  audioOutputDevices: any[] = [];

  videoInputDevices: any[] = [];

  devicesUpdatedCallbacks: ((fullDeviceInfo: any) => void)[] = [];

  configuration: MeetingSessionConfiguration | null = null;

  messagingSocket: ReconnectingPromisedWebSocket | null = null;

  messageUpdateCallbacks: ((message: any) => void)[] = [];

  initializeSdkWrapper = async () => {
    this.meetingSession = null;
    this.audioVideo = null;
    this.deviceController = null;
    this.title = null;
    this.name = null;
    this.region = null;
    this.currentAudioInputDevice = null;
    this.currentAudioOutputDevice = null;
    this.currentVideoInputDevice = null;
    this.audioInputDevices = [];
    this.audioOutputDevices = [];
    this.videoInputDevices = [];
    this.configuration = null;
    this.messagingSocket = null;
    this.messageUpdateCallbacks = [];
  };

  lookupClosestChimeRegion = async (): Promise<any> => {
    let region: string;
    try {
      const response = await fetch(`https://l.chime.aws`, {
        method: 'GET',
      });
      const json = await this.extractJSON(response);
      region = json.region;
    } catch (error) {
      this.logError(error);
    }
    return (
      this.supportedChimeRegions.find(({ value }) => value === region) ||
      this.supportedChimeRegions[0]
    );
  };

  async extractJSON(data: any) {
    try {
      return data.json();
    } catch (e) {
      console.error(e);
    }
  }

  createRoom = async (
    title: string | null,
    name: string | null,
    region: string | null
  ): Promise<AudioVideoFacade> => {
    if (!title || !name || !region) {
      throw new Error('Chime.CreateRoom: Missing required params');
    }

    const url = `${BASE_API_URL}/join?title=${encodeURIComponent(
      title
    )}&name=${encodeURIComponent(name)}&region=${encodeURIComponent(region)}`;

    const response = await fetch(url, {
      method: 'POST',
    });

    const json = await this.extractJSON(response);
    console.log(
      `?title=${encodeURIComponent(title)}&name=${encodeURIComponent(
        name
      )}&region=${encodeURIComponent(region)}`
    );

    const { JoinInfo } = json;
    if (!JoinInfo) {
      throw new Error('Error creating room, invalid response from server');
    }
    this.configuration = new MeetingSessionConfiguration(
      JoinInfo.Meeting,
      JoinInfo.Attendee
    );
    await this.initializeMeetingSession(this.configuration);

    this.title = title;
    this.name = name;
    this.region = region;

    return this.audioVideo as AudioVideoFacade;
  };

  initializeDeviceController = async (): Promise<DefaultDeviceController> => {
    this.deviceController = new DefaultDeviceController(this.logger);
    return this.deviceController;
  };

  initializeMeetingSession = async (
    configuration: MeetingSessionConfiguration
  ): Promise<void> => {
    this.meetingSession = new DefaultMeetingSession(
      configuration,
      this.logger,
      await this.initializeDeviceController()
    );
    this.audioVideo = this.meetingSession.audioVideo;

    // Set the camera video to 720p at 30fps using at most 2.8Mbit
    this.audioVideo.chooseVideoInputQuality(1280, 720, 30, 2800);
  };

  joinRoom = async (element: HTMLAudioElement | null): Promise<void> => {
    if (!element) {
      this.logError(new Error(`element does not exist`));
      return;
    }

    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        this.logError(event.reason);
      }
    );

    this.audioVideo?.bindAudioElement(element);
    this.audioVideo?.start();
  };

  leaveRoom = async (end: boolean): Promise<void> => {
    try {
      await this.dropAudio();
      await this.dropVideo();
      this.audioVideo?.stop();
    } catch (error) {
      this.logError(error);
    }

    try {
      await this.messagingSocket?.close(ChimeSdkWrapper.WEB_SOCKET_TIMEOUT_MS);
    } catch (error) {
      console.error('Unable to send close message on messaging socket.');
      this.logError(error);
    }

    try {
      if (end && this.title) {
        // const url = `${BASE_API_URL}/end?title=${encodeURIComponent(this.title)}`;
        // await fetch(url, {
        //   method: 'POST',
        // });
      }
    } catch (error) {
      this.logError(error);
    }

    this.initializeSdkWrapper();
  };

  /**
   * ====================================================================
   * Device
   * ====================================================================
   */

  chooseAudioInputDevice = async (device) => {
    try {
      console.log(`Choosing audio input device`, device);
      await this.deviceController?.chooseAudioInputDevice(device);
      this.currentAudioInputDevice = device;
    } catch (error) {
      console.log('Something went wrong choosing audio input device');
      this.logError(error);
    }
  };

  chooseAudioOutputDevice = async (device) => {
    try {
      console.log(`Choosing audio output device`, device);
      await this.deviceController?.chooseAudioOutputDevice(device);
      this.currentAudioOutputDevice = device;
    } catch (error) {
      console.log('Something went wrong choosing audio output device');
      this.logError(error);
    }
  };

  chooseVideoInputDevice = async (device) => {
    try {
      console.log(`Choosing video output device`, device);
      await this.deviceController?.chooseVideoInputDevice(device);
      this.currentVideoInputDevice = device;
    } catch (error) {
      console.log('Something went wrong choosing video input device');
      this.logError(error);
    }
  };

  chooseCurrentVideoInputDevice = async () => {
    if (!this.currentVideoInputDevice) {
      console.log('No current video input device to select');
      return;
    }

    try {
      await this.deviceController?.chooseVideoInputDevice(
        this.currentVideoInputDevice
      );
    } catch (error) {
      this.logError(error);
    }
  };

  /**
   * Call this when you want the camera/mic indicators to stop flashing red.
   */
  dropVideo = async () => {
    await this.audioVideo?.chooseVideoInputDevice(null);
  };

  dropAudio = async () => {
    this.audioVideo?.unbindAudioElement();
    await this.audioVideo?.chooseAudioInputDevice(null);
  };

  disableVideoAndLeaveRoom = async (end: boolean = false) => {
    if (!this.audioVideo) {
      return;
    }

    const av = this.audioVideo;
    console.debug('Disabling video.');

    try {
      await av.stopLocalVideoTile();
      console.debug('Stopped tile');
    } catch (error) {
      console.error('Error stopping local video.');
      this.logError(error);
    }

    try {
      await av.chooseVideoInputDevice(null);
    } catch (error) {
      console.error('Error discarding video input.');
      this.logError(error);
    }

    try {
      await this.leaveRoom(end);
    } catch (error) {
      console.error('Error leaving room after stopping local video.');
      this.logError(error);
    }
  };

  private logError = (error: Error) => {
    console.error(error);
  };
}

export default ChimeSdkWrapper;
