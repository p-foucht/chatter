import React from 'react';

import { MeetingStatusProvider } from '../../providers/MeetingStatusProvider';
import { RosterProvider } from '../../providers/RosterProvider';
import { DevicesProvider } from '../../providers/DevicesProvider';
import { LocalVideoProvider } from '../../providers/LocalVideoProvider';
import { ContentShareProvider } from '../../providers/ContentShareProvider';
import { MessagingProvider } from '../../providers/MessagingProvider';
import { SocketProvider } from '../../providers/SocketProvider';
import { SideNavProvider } from '../../providers/SideNavProvider';
import MeetingCanvas from '../../components/MeetingCanvas';

const Meeting = () => (
  <MeetingStatusProvider>
    <DevicesProvider>
      <LocalVideoProvider>
        <ContentShareProvider>
          <MessagingProvider>
            <SocketProvider>
              <RosterProvider>
                <SideNavProvider>
                  <MeetingCanvas />
                </SideNavProvider>
              </RosterProvider>
            </SocketProvider>
          </MessagingProvider>
        </ContentShareProvider>
      </LocalVideoProvider>
    </DevicesProvider>
  </MeetingStatusProvider>
);

export default Meeting;
