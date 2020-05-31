import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { AudioVideoFacade } from "amazon-chime-sdk-js";

import { useChime } from "./ChimeProvider";

enum Status {
  LOADING,
  SUCCEEDED,
  FAILED,
}

const StatusContext = createContext(Status.LOADING);
const AVContext = createContext<AudioVideoFacade | null>(null);

const MeetingStatusProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const audioEl = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState(Status.LOADING);
  const [audioVideo, setAudioVideo] = useState<AudioVideoFacade | null>(null);

  useEffect(() => {
    async function start() {
      try {
        const av = await chime.createRoom(
          "Chief's meeting",
          "Master Chief",
          "us-east-1"
        );
        setAudioVideo(av);
      } catch (e) {
        setStatus(Status.FAILED);
      }

      // TODO - joining the room needs to happen after device selection,
      // so this is an artifical delay to let the DeviceProvider select devices
      await new Promise((resolve) => setTimeout(resolve, 500));
      await chime.joinRoom(audioEl.current);

      setStatus(Status.SUCCEEDED);
    }

    start();

    return () => {
      setAudioVideo(null);
    };
  }, [chime]);

  return (
    <StatusContext.Provider value={status}>
      <AVContext.Provider value={audioVideo}>
        <audio ref={audioEl} />
        {children}
      </AVContext.Provider>
    </StatusContext.Provider>
  );
};

const useMeetingStatus = () => {
  const status = useContext(StatusContext);

  return status;
};

const useAudioVideo = (): AudioVideoFacade | null => {
  const av = useContext(AVContext);

  return av;
};

export { MeetingStatusProvider, useMeetingStatus, useAudioVideo };
