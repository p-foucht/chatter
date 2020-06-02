import React from 'react';

import MuteButton from './MuteButton';
import VideoButton from './VideoButton';

import styles from './styles';

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <MuteButton />
      <VideoButton />
    </div>
  );
};

export default ControlBar;
