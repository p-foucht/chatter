import React from 'react';

import LocalVideo from '../LocalVideo/LocalVideo';
import ControlBar from '../Controls/ControlBar';
import ContentShare from '../ContentShare';
import Whiteboard from '../Whiteboard';
import VideoGrid from '../Video/VideoGrid';
import Sidebar from '../Sidebar';
import { useSideNav } from '../../providers/SideNavProvider';

import styles from './styles';

const MeetingCanvas = () => {
  const { isOpen } = useSideNav();

  return (
    <div className={styles.wrapper}>
      <div className={styles.meeting}>
        <div className={styles.meetingContent}>
          <VideoGrid />
          <Whiteboard />
          <ContentShare />
          <LocalVideo />
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
  );
};

export default MeetingCanvas;
