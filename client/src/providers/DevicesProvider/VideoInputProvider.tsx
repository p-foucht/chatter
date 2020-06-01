import React, { createContext, useEffect, useState, useContext } from "react";
import { DeviceChangeObserver } from "amazon-chime-sdk-js";

import { useAudioVideo } from "../MeetingStatusProvider";
import { useChime } from "../ChimeProvider";

const Context = createContext<any>({});

const VideoInputProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const audioVideo = useAudioVideo();
  const [videoInputs, setVideoInputs] = useState<any>({});

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const observer: DeviceChangeObserver = {
      videoInputsChanged: (newvideoInputs: MediaDeviceInfo[]) => {
        console.log("VideoInputProvider: videoInputChanged");

        setVideoInputs(newvideoInputs);
      },
    };

    audioVideo.addDeviceChangeObserver(observer);

    return () => audioVideo.removeDeviceChangeObserver(observer);
  }, [audioVideo]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const getInputs = async () => {
      const inputs = await audioVideo.listVideoInputDevices();
      try {
        await chime.deviceController?.chooseVideoInputDevice(
          inputs[0].deviceId
        );
      } catch (e) {
        console.log(`Could not select initial video input - ${e.message}`);
      }
      setVideoInputs(inputs);
    };

    getInputs();
  }, [audioVideo, chime]);

  return <Context.Provider value={videoInputs}>{children}</Context.Provider>;
};

const useVideoInputs = () => {
  const videoInputs = useContext(Context);

  return videoInputs;
};

export { VideoInputProvider, useVideoInputs };
