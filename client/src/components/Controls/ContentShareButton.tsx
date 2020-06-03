import React from "react";
import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

import {
  useContentShareState,
  useToggleContentShare,
} from "../../providers/ContentShareProvider";
import ControlButton from "./ControlButton";

const getLabelAndIcon = (isActive, isLoading) => {
  if (isLoading) {
    return {
      label: "Loading...",
      icon: <AiOutlineLoading />,
    };
  } else if (isActive) {
    return {
      label: "Stop sharing my screen",
      icon: <MdStopScreenShare />,
    };
  } else {
    return {
      label: "Share my screen",
      icon: <MdScreenShare />,
    };
  }
};

const ContentShareButton = () => {
  const toggleContentShare = useToggleContentShare();
  const { isLocalUserSharing, isLocalShareLoading } = useContentShareState();
  const { icon, label } = getLabelAndIcon(
    isLocalUserSharing,
    isLocalShareLoading
  );

  return (
    <ControlButton icon={icon} onClick={toggleContentShare} label={label} />
  );
};

export default ContentShareButton;
