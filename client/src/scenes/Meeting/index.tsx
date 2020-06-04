import React from "react";

import Sidebar from "../../components/Sidebar";
import MeetingCanvas from "../../components/MeetingCanvas";
import { MeetingStatusProvider } from "../../providers/MeetingStatusProvider";
import { RosterProvider } from "../../providers/RosterProvider";
import { DevicesProvider } from "../../providers/DevicesProvider";
import { LocalVideoProvider } from "../../providers/LocalVideoProvider";
import { ContentShareProvider } from "../../providers/ContentShareProvider";
import { MessagingProvider } from "../../providers/MessagingProvider";

import styles from "./styles";

const Meeting = () => (
  <MeetingStatusProvider>
    <DevicesProvider>
      <LocalVideoProvider>
        <ContentShareProvider>
          <RosterProvider>
            <MessagingProvider>
              <div className={styles.wrapper}>
                <div className={styles.meeting}>
                  <MeetingCanvas />
                </div>
                <div className={styles.roster}>
                  <Sidebar />
                </div>
              </div>
            </MessagingProvider>
          </RosterProvider>
        </ContentShareProvider>
      </LocalVideoProvider>
    </DevicesProvider>
  </MeetingStatusProvider>
);

export default Meeting;
