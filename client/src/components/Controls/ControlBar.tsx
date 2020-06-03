import React from "react";

import MuteButton from "./MuteButton";
import VideoButton from "./VideoButton";
import ButtonGroup from "../UI/ButtonGroup";

import styles from "./styles";

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <ButtonGroup>
        <MuteButton />
        <MuteButton />
        <MuteButton />
        <VideoButton />
      </ButtonGroup>
    </div>
  );
};

export default ControlBar;
