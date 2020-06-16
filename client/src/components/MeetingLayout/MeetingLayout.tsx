import React from 'react';

import MeetingCanvas from '../MeetingCanvas';
import Sidebar from '../Sidebar';
import { useSideNav } from '../../providers/SideNavProvider';

import styles from './styles';

const MeetingLayout = () => {
  const { isOpen } = useSideNav();

  return (
    <div className={styles.wrapper}>
      <div className={styles.meeting}>
        <MeetingCanvas />
      </div>
      {isOpen ? (
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      ) : null}
    </div>
  );
};

export default MeetingLayout;
