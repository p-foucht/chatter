import React, { useEffect, useRef } from 'react';
import { VideoTileState } from 'amazon-chime-sdk-js';

import { useAudioVideo } from '../../providers/MeetingStatusProvider';

import styles from './styles';

export default function LocalVideo() {
  const av = useAudioVideo();
  const videoElement = useRef(null);

  useEffect(() => {
    if (!av) {
      return;
    }

    const observer = {
      videoTileDidUpdate: (tileState: VideoTileState): void => {
        if (
          !tileState.boundAttendeeId ||
          !tileState.localTile ||
          !tileState.tileId ||
          !videoElement.current
        ) {
          return;
        }
        av.bindVideoElement(
          tileState.tileId,
          (videoElement.current as unknown) as HTMLVideoElement
        );
      },
    };

    av.addObserver(observer);

    return () => av.removeObserver(observer);
  }, [av]);

  return (
    <video
      className={styles.video}
      muted
      ref={videoElement}
      height='100%'
      width='100%'
    />
  );
}
