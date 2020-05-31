import { useEffect, useState, useCallback } from "react";

import { useAudioVideo } from "../providers/MeetingStatusProvider";

const useLocalMute = () => {
  const av = useAudioVideo();
  const [muted, setMuted] = useState(() => av?.realtimeIsLocalAudioMuted());

  useEffect(() => {
    if (!av) {
      return;
    }

    setMuted(av?.realtimeIsLocalAudioMuted());
  }, [av]);

  useEffect(() => {
    const cb = (isMuted) => {
      setMuted(isMuted);
    };

    av?.realtimeSubscribeToMuteAndUnmuteLocalAudio(cb);

    return () => av?.realtimeUnsubscribeToMuteAndUnmuteLocalAudio(cb);
  }, [av]);

  const toggleMute = useCallback(() => {
    if (muted) {
      av?.realtimeUnmuteLocalAudio();
    } else {
      av?.realtimeMuteLocalAudio();
    }
  }, [muted, av]);

  return { muted, toggleMute };
};

export default useLocalMute;
