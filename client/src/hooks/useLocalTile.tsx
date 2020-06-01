import { useEffect, useState, useCallback } from "react";

import { useAudioVideo } from "../providers/MeetingStatusProvider";

const useLocalTile = () => {
  const av = useAudioVideo();
  const [broadcasting, setBroadcasting] = useState(() =>
    av?.hasStartedLocalVideoTile()
  );

  useEffect(() => {
    if (!av) {
      return;
    }
    setBroadcasting(av?.hasStartedLocalVideoTile());
  }, [av]);

  useEffect(() => {
    const cb = (isBroadcasting) => {
      setBroadcasting(isBroadcasting);
    };

    // Subscribe to change?
  }, [av]);

  const toggleVideo = useCallback(() => {
    if (!av) {
      console.log(av);
      return;
    }

    console.log(broadcasting);

    if (broadcasting) {
      av.stopLocalVideoTile();
      setBroadcasting(false);
    } else {
      av?.startLocalVideoTile();
      setBroadcasting(true);
    }
  }, [broadcasting, av]);

  return { broadcasting, toggleVideo };
};

export default useLocalTile;
