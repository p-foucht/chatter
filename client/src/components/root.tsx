import React from 'react';
import { RecoilRoot } from 'recoil';

import { ChimeProvider } from '../providers/ChimeProvider';
// import { MeetingStatusProvider } from '../providers/MeetingStatusProvider';
// import { RosterProvider } from '../providers/RosterProvider';
// import { DevicesProvider } from '../providers/DevicesProvider';
// import Roster from './Roster';
// import LocalVideo from './LocalVideo/LocalVideo';
// import ControlBar from './Controls/ControlBar';
import Routes from '../routes';

const Root = () => (
  <RecoilRoot>
    <ChimeProvider>
      <Routes />
    </ChimeProvider>
  </RecoilRoot>
);

export default Root;
