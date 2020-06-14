import React, { useRef } from 'react';

import styles from './styles';

const VideoTile = () => {
  const videoElement = useRef(null);

  return (
    <video
      className={styles.video}
      muted
      ref={videoElement}
      height='300px'
      width='400px'
    />
  );
};

export default VideoTile;
