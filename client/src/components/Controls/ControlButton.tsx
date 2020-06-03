import React, { ReactNode } from "react";

import IconButton from "../UI/IconButton";
import Tooltip from "../UI/Tooltip";

interface Props {
  label: string;
  onClick: () => void;
  icon: ReactNode;
}

const ControlButton: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <Tooltip tooltip={label}>
      <IconButton label={label} {...rest} />
    </Tooltip>
  );
};

export default ControlButton;
