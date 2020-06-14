import React from 'react';

import MuteButton from './MuteButton';
import VideoButton from './VideoButton';
import ButtonGroup from '../UI/ButtonGroup';
import ContentShareButton from './ContentShareButton';
import LeaveMeetingButton from './LeaveMeetingButton';
import WhiteboardButton from './WhiteboardButton';
import Settings from './Settings';

import styles from './styles';

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <ButtonGroup>
        <MuteButton />
        <VideoButton />
        <ContentShareButton />
        <LeaveMeetingButton />
        <WhiteboardButton />
        <Settings />
      </ButtonGroup>
    </div>
  );
};

export default ControlBar;
