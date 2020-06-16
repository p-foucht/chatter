import React from 'react';

import Sidebar from '../../components/Sidebar';
import MeetingCanvas from '../../components/MeetingCanvas';
import { MeetingStatusProvider } from '../../providers/MeetingStatusProvider';
import { RosterProvider } from '../../providers/RosterProvider';
import { DevicesProvider } from '../../providers/DevicesProvider';
import { LocalVideoProvider } from '../../providers/LocalVideoProvider';
import { ContentShareProvider } from '../../providers/ContentShareProvider';
import { MessagingProvider } from '../../providers/MessagingProvider';
import { SocketProvider } from '../../providers/SocketProvider';

import styles from '../../components/MeetingCanvas/styles';

const Meeting = () => (
  <MeetingStatusProvider>
    <DevicesProvider>
      <LocalVideoProvider>
        <ContentShareProvider>
          <RosterProvider>
            <SocketProvider>
              <MessagingProvider>
                <MeetingCanvas />
              </MessagingProvider>
            </SocketProvider>
          </RosterProvider>
        </ContentShareProvider>
      </LocalVideoProvider>
    </DevicesProvider>
  </MeetingStatusProvider>
);

export default Meeting;
