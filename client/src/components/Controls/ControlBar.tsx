import React from "react";

import MuteButton from "./MuteButton";
import VideoButton from "./VideoButton";
import ButtonGroup from "../UI/ButtonGroup";
import ContentShareButton from "./ContentShareButton";
import LeaveMeetingButton from "./LeaveMeetingButton";

import styles from "./styles";

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <ButtonGroup>
        <MuteButton />
        <VideoButton />
        <ContentShareButton />
        <LeaveMeetingButton />
      </ButtonGroup>
    </div>
  );
};

export default ControlBar;
