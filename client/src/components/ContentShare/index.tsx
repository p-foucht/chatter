import React, { useEffect, useRef } from 'react';
import { AudioVideoObserver } from 'amazon-chime-sdk-js';

import { useAudioVideo } from '../../providers/MeetingStatusProvider';

import styles from './styles';
import { useContentShareState } from '../../providers/ContentShareProvider';

const ContentShare = () => {
  const av = useAudioVideo();
  const { isSomeoneSharing } = useContentShareState();
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
    <div
      className={styles.wrapper}
      style={{ display: isSomeoneSharing ? 'flex' : 'none' }}
    >
      <video ref={videoEl} />
    </div>
  );
};

export default ContentShare;
