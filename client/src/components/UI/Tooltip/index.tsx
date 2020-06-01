import React from "react";
import RcTooltip from "rc-tooltip";

import styles from "./styles";
import "rc-tooltip/assets/bootstrap.css";
import "./overrides.css";

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
      overlayClassName={styles.tooltip}
    >
      <div>{children}</div>
    </RcTooltip>
  );
};

export default Tooltip;
