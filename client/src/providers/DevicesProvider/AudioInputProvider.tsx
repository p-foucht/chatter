import React, { createContext, useEffect, useState, useContext } from 'react';
import { DeviceChangeObserver } from 'amazon-chime-sdk-js';

import { useAudioVideo } from '../MeetingStatusProvider';
import { useChime } from '../ChimeProvider';

const Context = createContext<MediaDeviceInfo[]>([]);

const AudioInputProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const audioVideo = useAudioVideo();
  const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const observer: DeviceChangeObserver = {
      audioInputsChanged: (newAudioInputs: MediaDeviceInfo[]) => {
        console.log('AudioInputProvider:: audioInputsChanged');

        setAudioInputs(newAudioInputs);
      },
    };

    audioVideo.addDeviceChangeObserver(observer);

    return () => audioVideo.removeDeviceChangeObserver(observer);
  }, [audioVideo]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const initInputs = async () => {
      const inputs = await audioVideo.listAudioInputDevices();
      try {
        await chime.chooseAudioInputDevice(inputs[0]);
      } catch (e) {
        console.log(`Could not select initial audio input - ${e.message}`);
      }
      setAudioInputs(inputs);
    };

    initInputs();
  }, [audioVideo, chime]);

  return <Context.Provider value={audioInputs}>{children}</Context.Provider>;
};

const useAudioInputs = () => {
  const audioInputs = useContext(Context);

  return audioInputs;
};

export { AudioInputProvider, useAudioInputs };
