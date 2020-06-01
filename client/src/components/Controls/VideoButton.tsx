import React from "react";
import { MdVideocam, MdVideocamOff } from "react-icons/md";

import useLocalTile from "../../hooks/useLocalTile";
import IconButton from "../UI/IconButton";
import Tooltip from "../UI/Tooltip";

const VideoButton = () => {
  const { broadcasting, toggleVideo } = useLocalTile();
  const label = broadcasting ? "Hide" : "Show";

  return (
    <Tooltip tooltip={label}>
      <IconButton
        className="mute-button"
        icon={broadcasting ? <MdVideocam /> : <MdVideocamOff />}
        onClick={toggleVideo}
        label={label}
      />
    </Tooltip>
  );
};

export default VideoButton;
