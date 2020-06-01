import React from "react";
import styles from "./styles";
import MuteButton from "./MuteButton";
import VideoButton from "./VideoButton";

const ControlBar = () => {
  return (
    <div className={styles.controlBar}>
      <MuteButton />
      <VideoButton />
    </div>
  );
};

export default ControlBar;
