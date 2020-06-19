import React, { useState } from 'react';
import Fullscreen from 'react-full-screen';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

import LocalVideo from '../LocalVideo/LocalVideo';
import ControlBar from '../Controls/ControlBar';
import ContentShare from '../ContentShare';
import Whiteboard from '../Whiteboard';
import VideoGrid from '../Video/VideoGrid';
import Sidebar from '../Sidebar';
import { useSideNav } from '../../providers/SideNavProvider';

import styles from './styles';
import './index.css';

const MeetingCanvas = () => {
  const { isOpen } = useSideNav();
  const [isFullscreen, setFullscreen] = useState(false);

  const screenHandler = () => {
    setFullscreen((prevScreen) => !prevScreen);
  };

  return (
    <Fullscreen
      enabled={isFullscreen}
      onChange={(isFull) => setFullscreen(isFull)}
    >
      <div className={styles.wrapper}>
        <div className={styles.meeting}>
          <div className={styles.meetingContent}>
            <VideoGrid />
            <Whiteboard />
            <ContentShare />
            <LocalVideo />
          </div>

          <div onClick={screenHandler} className={styles.fullscreenIcon}>
            {isFullscreen ? (
              <MdFullscreenExit size='2.5rem' color='#fff' />
            ) : (
              <MdFullscreen size='2.5rem' color='#fff' />
            )}
          </div>

          <div className={styles.controls}>
            <ControlBar />
          </div>
        </div>
        {isOpen ? (
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        ) : null}
      </div>
    </Fullscreen>
  );
};

export default MeetingCanvas;
