import React from "react";
import { RecoilRoot } from "recoil";

import { ChimeProvider } from "../providers/ChimeProvider";
// import { MeetingStatusProvider } from '../providers/MeetingStatusProvider';
// import { RosterProvider } from '../providers/RosterProvider';
// import { DevicesProvider } from '../providers/DevicesProvider';
// import Roster from './Roster';
// import LocalVideo from './LocalVideo/LocalVideo';
// import ControlBar from './Controls/ControlBar';
import Routes from "../routes";
import { AuthProvider } from "../providers/AuthProvider";

const Root = () => (
  <RecoilRoot>
    <AuthProvider>
      <ChimeProvider>
        <Routes />
      </ChimeProvider>
    </AuthProvider>
  </RecoilRoot>
);

export default Root;
