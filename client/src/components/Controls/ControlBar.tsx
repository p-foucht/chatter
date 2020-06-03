import React from "react";

import MuteButton from "./MuteButton";
import VideoButton from "./VideoButton";
import ButtonGroup from "../UI/ButtonGroup";
import ContentShareButton from "./ContentShareButton";

import styles from "./styles";

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <ButtonGroup>
        <MuteButton />
        <MuteButton />
        <VideoButton />
        <ContentShareButton />
      </ButtonGroup>
    </div>
  );
};

export default ControlBar;
