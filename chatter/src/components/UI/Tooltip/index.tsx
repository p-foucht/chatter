import React from "react";
import RcTooltip from "rc-tooltip";

import "rc-tooltip/assets/bootstrap.css";
import "./index.css";

type Position =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

interface Props {
  position?: Position;
  tooltip: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<Props> = ({ position = "top", tooltip, children }) => {
  return (
    <RcTooltip
      mouseLeaveDelay={0}
      trigger={["hover", "focus"]}
      placement={position}
      overlay={<div>{tooltip}</div>}
      overlayClassName="tooltip"
    >
      {children}
    </RcTooltip>
  );
};

export default Tooltip;
