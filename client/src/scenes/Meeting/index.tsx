import React from 'react';

import Roster from '../../components/Roster';
import MeetingCanvas from '../../components/MeetingCanvas';
import { MeetingStatusProvider } from '../../providers/MeetingStatusProvider';
import { RosterProvider } from '../../providers/RosterProvider';
import { DevicesProvider } from '../../providers/DevicesProvider';
import { LocalVideoProvider } from '../../providers/LocalVideoProvider';

import styles from './styles';

const Meeting = () => (
  <MeetingStatusProvider>
    <DevicesProvider>
      <LocalVideoProvider>
        <RosterProvider>
          <div className={styles.wrapper}>
            <div className={styles.meeting}>
              <MeetingCanvas />
            </div>
            <div className={styles.roster}>
              <Roster />
            </div>
          </div>
        </RosterProvider>
      </LocalVideoProvider>
    </DevicesProvider>
  </MeetingStatusProvider>
);

export default Meeting;
