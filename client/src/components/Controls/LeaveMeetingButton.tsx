import React from "react";
import { MdCallEnd } from "react-icons/md";

import ControlButton from "./ControlButton";
import { useChime } from "../../providers/ChimeProvider";
import { useHistory } from "react-router-dom";

const LeaveMeetingButton = () => {
  const chime = useChime();
  const history = useHistory();

  // need to conditionally route if leave room is successfull
  const leaveMeeting = async () => {
    await chime.leaveRoom(false);
    history.push("/");
  };

  return (
    <ControlButton
      icon={<MdCallEnd />}
      onClick={leaveMeeting}
      label="Leave Meeting"
    />
  );
};

export default LeaveMeetingButton;
