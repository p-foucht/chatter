import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";
import { AudioVideoFacade } from "amazon-chime-sdk-js";
import { useParams } from "react-router-dom";

import { useChime } from "./ChimeProvider";
import { useAuth } from "./AuthProvider";

enum Status {
  LOADING,
  SUCCEEDED,
  FAILED,
}

const StatusContext = createContext(Status.LOADING);
const AVContext = createContext<AudioVideoFacade | null>(null);

const MeetingStatusProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const params = useParams();
  const title = params.meetingTitle;
  const { username } = useAuth();
  const audioEl = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState(Status.LOADING);
  const [audioVideo, setAudioVideo] = useState<AudioVideoFacade | null>(null);

  useEffect(() => {
    async function start() {
      try {
        const av = await chime.createRoom(title, username, "us-east-1");
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
  }, [chime, title, username]);

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
