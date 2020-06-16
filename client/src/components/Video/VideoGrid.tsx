import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import VideoTile from './VideoTile';
import { useAudioVideo } from '../../providers/MeetingStatusProvider';
import { VideoTileState } from 'amazon-chime-sdk-js';

import styles from './styles';

const VideoGrid = () => {
  const av = useAudioVideo();

  const ARRAY_OF_16 = new Array(16).fill(0);

  const videoElements: any = useRef(new Array(16));

  const indexMapRef = useRef({});

  const [size, setSize] = useState(0);

  useEffect(() => {
    if (!av) {
      return;
    }

    const acquireVideoElement = (tileId: number) => {
      for (let i = 0; i < 16; i += 1) {
        if (indexMapRef.current[i] == tileId) {
          return (videoElements.current[i] as unknown) as HTMLVideoElement;
        }
      }

      for (let i = 0; i < 16; i += 1) {
        if (!indexMapRef.current.hasOwnProperty(i)) {
          indexMapRef.current[i] = tileId;
          return (videoElements.current[i] as unknown) as HTMLVideoElement;
        }
      }

      throw new Error('No video element is available');
    };

    const releaseVideoElement = (tileId) => {
      for (let i = 0; i < 16; i += 1) {
        if (indexMapRef.current[i] === tileId) {
          delete indexMapRef.current[i];
          setSize((currentSize) => currentSize - 1);

          return;
        }
      }
    };

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

        const keys = Object.values(indexMapRef.current);

        const hasTileId = keys.indexOf(tileState.tileId) >= 0;

        if (hasTileId) {
          return;
        }

        av.bindVideoElement(
          tileState.tileId,
          acquireVideoElement(tileState.tileId)
        );

        setSize((currentSize) => currentSize + 1);
      },

      videoTileWasRemoved: (tileId) => {
        releaseVideoElement(tileId);
      },
    };

    av.addObserver(observer);

    return () => av.removeObserver(observer);
  }, [av]);

  let width = '100%';

  if (size % 4 === 0) {
    width = '25%';
  } else if (size % 3 === 0) {
    width = '33%';
  } else if (size % 2 === 0) {
    width = '50%';
  }

  const elements = ARRAY_OF_16.map((el, index) => {
    const hasIndex = indexMapRef.current.hasOwnProperty(index);

    const classes = classNames(styles.video, { [styles.active]: hasIndex });
    return (
      <VideoTile
        key={index}
        index={index}
        width={width}
        classes={classes}
        active={hasIndex}
        ref={(ref) => (videoElements.current[index] = ref)}
      />
    );
  });

  return (
    <div>
      dfsdfsdfsdsfdfs
      <div className={styles.grid}>{elements}</div>
    </div>
  );
};

export default VideoGrid;
