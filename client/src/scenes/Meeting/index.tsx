import React from 'react';

import MeetingLayout from '../../components/MeetingLayout/MeetingLayout';
import { MeetingStatusProvider } from '../../providers/MeetingStatusProvider';
import { RosterProvider } from '../../providers/RosterProvider';
import { DevicesProvider } from '../../providers/DevicesProvider';
import { LocalVideoProvider } from '../../providers/LocalVideoProvider';
import { ContentShareProvider } from '../../providers/ContentShareProvider';
import { MessagingProvider } from '../../providers/MessagingProvider';
import { SocketProvider } from '../../providers/SocketProvider';
import { SideNavProvider } from '../../providers/SideNavProvider';

const Meeting = () => (
  <MeetingStatusProvider>
    <DevicesProvider>
      <LocalVideoProvider>
        <ContentShareProvider>
          <RosterProvider>
            <SocketProvider>
              <MessagingProvider>
                <SideNavProvider>
                  <MeetingLayout />
                </SideNavProvider>
              </MessagingProvider>
            </SocketProvider>
          </RosterProvider>
        </ContentShareProvider>
      </LocalVideoProvider>
    </DevicesProvider>
  </MeetingStatusProvider>
);

export default Meeting;
