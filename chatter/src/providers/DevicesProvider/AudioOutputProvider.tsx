import React, { createContext, useEffect, useState, useContext } from "react";
import { DeviceChangeObserver } from "amazon-chime-sdk-js";

import { useAudioVideo } from "../MeetingStatusProvider";
import { useChime } from "../ChimeProvider";

const Context = createContext<MediaDeviceInfo[]>([]);

const AudioOutputProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const audioVideo = useAudioVideo();
  const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const observer: DeviceChangeObserver = {
      audioOutputsChanged: (newaudioOutput: MediaDeviceInfo[]) => {
        console.log("AudioOutputProvider: audioOutputChanged");

        setAudioOutputs(newaudioOutput);
      },
    };

    audioVideo.addDeviceChangeObserver(observer);

    return () => audioVideo.removeDeviceChangeObserver(observer);
  }, [audioVideo]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const initOutputs = async () => {
      const outputs = await audioVideo.listAudioInputDevices();
      try {
        chime?.deviceController?.chooseAudioOutputDevice(outputs[0].deviceId);
      } catch (e) {
        console.log(`Could not select initial audio output - ${e.message}`);
      }
      setAudioOutputs(outputs);
    };

    initOutputs();
  }, [audioVideo, chime]);

  return <Context.Provider value={audioOutputs}>{children}</Context.Provider>;
};

const useAudioOutputs = () => {
  const audioOutputs = useContext(Context);

  return audioOutputs;
};

export { AudioOutputProvider, useAudioOutputs };
