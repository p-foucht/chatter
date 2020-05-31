import React from "react";
import { RecoilRoot } from "recoil";

import { ChimeProvider } from "../providers/ChimeProvider";
import { MeetingStatusProvider } from "../providers/MeetingStatusProvider";
import { RosterProvider } from "../providers/RosterProvider";
import { DevicesProvider } from "../providers/DevicesProvider";
import Roster from "./Roster";
import MuteButton from "./Controls/MuteButton";

const Root = () => (
  <RecoilRoot>
    <ChimeProvider>
      <MeetingStatusProvider>
        <DevicesProvider>
          <RosterProvider>
            <Roster />
            <MuteButton />
          </RosterProvider>
        </DevicesProvider>
      </MeetingStatusProvider>
    </ChimeProvider>
  </RecoilRoot>
);

export default Root;
