import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import classNames from 'classnames';

import VideoTile from './VideoTile';
import { useAudioVideo } from '../../providers/MeetingStatusProvider';
import { VideoTileState } from 'amazon-chime-sdk-js';
import { useContentShareState } from '../../providers/ContentShareProvider';

import styles from './styles';
import './index.css';

const VideoGrid = () => {
  const av = useAudioVideo();
  const { isSomeoneSharing } = useContentShareState();

  const ARRAY_OF_16 = new Array(16).fill(0);
  const videoElements: any = useRef(new Array(16));
  const indexMapRef = useRef({});
  const [size, setSize] = useState(0);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const containerRef: any = useRef();

  const fullscreenVideoElement: any = useRef(null);

  const [isFullscreen, setIsFullScreen] = useState(false);
  const [fullscreenId, setFullscreenId] = useState(-1);

  // Find height of parent container to help choose video tile heights
  useLayoutEffect(() => {
    if (containerRef.current !== null) {
      setHeight(containerRef.current.parentElement.clientHeight);
      setWidth(containerRef.current.parentElement.clientWidth);
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

  const createFullScreenElement = (id: any) => {
    av?.bindVideoElement(
      id,
      (fullscreenVideoElement.current as unknown) as HTMLVideoElement
    );
    setIsFullScreen(true);
    setFullscreenId(id);
  };

  const closeFullScreen = () => {
    setFullscreenId(-1);
    setIsFullScreen(false);
  };

  generateAspectRatioClass(height, width, size, isSomeoneSharing);

  const elements = ARRAY_OF_16.map((el, index) => {
    const hasIndex = indexMapRef.current.hasOwnProperty(index);
    const classes = classNames(styles.video, { [styles.active]: hasIndex });

    let id = indexMapRef.current[index];
    let tileIsFullscreen = id === fullscreenId;
    let mini = isFullscreen || isSomeoneSharing;

    return (
      <VideoTile
        isFullscreen={tileIsFullscreen}
        onDoubleClick={
          tileIsFullscreen ? closeFullScreen : () => createFullScreenElement(id)
        }
        id={id}
        key={index}
        index={index}
        classes={classes}
        active={hasIndex}
        mini={mini}
        ref={(ref) => (videoElements.current[index] = ref)}
      />
    );
  });

  let grid = cssClass(size);

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, {
        [styles.fill]: !isSomeoneSharing,
      })}
    >
      <div
        className={
          isSomeoneSharing || isFullscreen ? styles.row : 'grid ' + grid
        }
      >
        {elements}
      </div>
      <video
        ref={fullscreenVideoElement}
        className={styles.video}
        style={{
          display: isFullscreen && !isSomeoneSharing ? 'block' : 'none',
        }}
      />
    </div>
  );
};

function generateAspectRatioClass(
  containerHeight,
  containerWidth,
  numberOfVideos,
  isSomeoneSharing
) {
  let ratio = containerWidth / containerHeight;

  let aspectRatio = 1;
}

function cssClass(size, aspectRatio?) {
  let string = `grid--size-${size}`;
  if (aspectRatio) {
    string += `.${aspectRatio}`;
  }
  return string;
}

export default VideoGrid;
