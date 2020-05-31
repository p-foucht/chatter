import React from "react";
import { MdMic, MdMicOff } from "react-icons/md";

import useLocalMute from "../../hooks/useLocalMute";
import IconButton from "../UI/IconButton";
import Tooltip from "../UI/Tooltip";

const MuteButton = () => {
  const { muted, toggleMute } = useLocalMute();
  const label = muted ? "Unmute" : "Mute";

  return (
    <Tooltip tooltip={label}>
      <IconButton
        className="mute-button"
        icon={muted ? <MdMicOff /> : <MdMic />}
        onClick={toggleMute}
        label={label}
      />
    </Tooltip>
  );
};

export default MuteButton;
