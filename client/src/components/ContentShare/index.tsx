import React, { useEffect, useRef } from 'react';
import { AudioVideoObserver } from 'amazon-chime-sdk-js';

import { useAudioVideo } from '../../providers/MeetingStatusProvider';

import styles from './styles';

const ContentShare = () => {
  const av = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!av) {
      return;
    }

    const observer: AudioVideoObserver = {
      videoTileDidUpdate: (tileState) => {
        if (!tileState.tileId || !tileState.isContent) {
          return;
        }

        av.bindVideoElement(tileState.tileId, videoEl.current!);
      },
    };

    av.addObserver(observer);

    return () => av.removeObserver(observer);
  }, [av]);

  return (
    <div className={styles.wrapper}>
      <video ref={videoEl} />
    </div>
  );
};

export default ContentShare;
