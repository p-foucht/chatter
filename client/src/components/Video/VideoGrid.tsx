import React, { useRef, useEffect, useState, createRef } from 'react';

import { useAudioVideo } from '../../providers/MeetingStatusProvider';
import { VideoTileState } from 'amazon-chime-sdk-js';

import styles from './styles';

const VideoGrid = () => {
  const av = useAudioVideo();

  const ARRAY_OF_16 = new Array(16).fill(0);

  const videoElements: any = useRef([]);

  videoElements.current = new Array(16);

  const indexMap = {};

  const acquireVideoElement = (tileId: number) => {
    for (let i = 0; i < 16; i += 1) {
      if (indexMap[i] == tileId) {
        return (videoElements.current[i] as unknown) as HTMLVideoElement;
      }
    }

    for (let i = 0; i < 16; i += 1) {
      if (!indexMap.hasOwnProperty(i)) {
        indexMap[i] = tileId;
        return (videoElements.current[i] as unknown) as HTMLVideoElement;
      }
    }

    throw new Error('No video element is available');
  };

  const releaseVideoElement = (tileId) => {
    for (let i = 0; i < 16; i += 1) {
      if (indexMap[i] === tileId) {
        delete indexMap[i];
        return;
      }
    }
  };

  useEffect(() => {
    if (!av) {
      return;
    }

    const observer = {
      videoTileDidUpdate: (tileState: VideoTileState): void => {
        if (
          !tileState.boundAttendeeId ||
          tileState.localTile ||
          tileState.isContent
        ) {
          return;
        }

        if (tileState.tileId === null) {
          return;
        }

        av.bindVideoElement(
          tileState.tileId,
          acquireVideoElement(tileState.tileId)
        );
      },

      videoTileWasRemoved: (tileId) => {
        releaseVideoElement(tileId);
      },
    };

    av.addObserver(observer);

    return () => av.removeObserver(observer);
  }, [av]);

  const elements = ARRAY_OF_16.map((el, index) => {
    return (
      <video
        className={styles.video}
        muted
        ref={(ref) => (videoElements.current[index] = ref)}
      />
    );
  });

  return (
    <div>
      Hi there! This is video!
      <div className={styles.grid}>{elements}</div>
    </div>
  );
};

export default VideoGrid;
