import React from "react";
import { MdMic, MdMicOff } from "react-icons/md";

import ControlButton from "./ControlButton";
import useLocalMute from "../../hooks/useLocalMute";

const MuteButton = () => {
  const { muted, toggleMute } = useLocalMute();
  const label = muted ? "Unmute" : "Mute";

  return (
    <ControlButton
      icon={muted ? <MdMicOff /> : <MdMic />}
      onClick={toggleMute}
      label={label}
    />
  );
};

export default MuteButton;
