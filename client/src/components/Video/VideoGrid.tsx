import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import VideoTile from './VideoTile';
import { useAudioVideo } from '../../providers/MeetingStatusProvider';
import { VideoTileState } from 'amazon-chime-sdk-js';
import { useContentShareState } from '../../providers/ContentShareProvider';

import styles from './styles';

const VideoGrid = () => {
  const av = useAudioVideo();
  const { isSomeoneSharing } = useContentShareState();

  const ARRAY_OF_16 = new Array(16).fill(0);
  const videoElements: any = useRef(new Array(16));
  const indexMapRef = useRef({});
  const [size, setSize] = useState(0);

  const [height, setHeight] = useState(0);
  const containerRef: any = useRef();

  // Find height of parent container to help choose video tile heights
  useEffect(() => {
    if (containerRef.current !== null) {
      setHeight(containerRef.current.parentElement.clientHeight);
    }
  }, []);

  // Subscribing to Chime SDK to create video elements
  useEffect(() => {
    if (!av) {
      return;
    }

    const acquireVideoElement = (tileId: number) => {
      for (let i = 0; i < 16; i += 1) {
        if (indexMapRef.current[i] === tileId) {
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

  const elements = ARRAY_OF_16.map((el, index) => {
    const hasIndex = indexMapRef.current.hasOwnProperty(index);
    const classes = classNames(styles.video, { [styles.active]: hasIndex });
    let vidStyles = generateVideoStyles(height, size, isSomeoneSharing);

    return (
      <VideoTile
        styles={vidStyles}
        key={index}
        index={index}
        width={vidStyles.width}
        classes={classes}
        active={hasIndex}
        ref={(ref) => (videoElements.current[index] = ref)}
      />
    );
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={isSomeoneSharing ? styles.row : styles.grid}>
        {elements}
      </div>
    </div>
  );
};

// Create the width and maxHeights of the video tiles
function generateVideoStyles(
  containerHeight: any,
  numberOfVideos: any,
  isSomeoneSharing: boolean
) {
  let rows;
  let width = '100%';
  let height;

  if (isSomeoneSharing) {
    return { width: '20rem', height: '200px' };
  }

  if (numberOfVideos <= 2) {
    rows = 1;
  } else if (numberOfVideos <= 6) {
    rows = 2;
  } else if (numberOfVideos <= 12) {
    rows = 3;
  } else {
    rows = 4;
  }

  if (numberOfVideos === 4 || numberOfVideos === 3) {
    width = '50%';
  } else if (numberOfVideos % 4 === 0) {
    width = '25%';
  } else if (numberOfVideos % 3 === 0 || numberOfVideos >= 5) {
    width = '33%';
  } else if (numberOfVideos % 2 === 0) {
    width = '50%';
  }

  height = containerHeight / rows;

  return { width: width, height: height };
}

export default VideoGrid;
