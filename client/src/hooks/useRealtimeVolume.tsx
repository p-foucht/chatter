import { useEffect, useState, useCallback } from "react";
import { useAudioVideo } from "../providers/MeetingStatusProvider";

const useRealtimeVolume = (id: any) => {
  const av = useAudioVideo();
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!av) {
      return;
    }
    const cb = (
      attendeeId: string,
      volume: number | null,
      muted: boolean | null,
      signalStrength: number | null,
      esxternalUserId?: string
    ): void => {
      if (volume) {
        setVolume(volume);
      }
    };

    av?.realtimeSubscribeToVolumeIndicator(id, cb);

    return () => av?.realtimeUnsubscribeFromVolumeIndicator(id);
  }, [av]);

  return { volume };
};

export default useRealtimeVolume;
