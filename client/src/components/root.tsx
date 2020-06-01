import React from "react";
import { RecoilRoot } from "recoil";

import { ChimeProvider } from "../providers/ChimeProvider";
import { MeetingStatusProvider } from "../providers/MeetingStatusProvider";
import { RosterProvider } from "../providers/RosterProvider";
import { DevicesProvider } from "../providers/DevicesProvider";
import Roster from "./Roster";
import LocalVideo from "./LocalVideo/LocalVideo";
import ControlBar from "./Controls/ControlBar";

const Root = () => (
  <RecoilRoot>
    <ChimeProvider>
      <MeetingStatusProvider>
        <DevicesProvider>
          <RosterProvider>
            <div
              style={{
                maxWidth: "calc(100% - 25rem)",
                minWidth: "70%",
                width: "100%",
              }}
            >
              <LocalVideo />
              <ControlBar />
            </div>
            <Roster />
          </RosterProvider>
        </DevicesProvider>
      </MeetingStatusProvider>
    </ChimeProvider>
  </RecoilRoot>
);

export default Root;
