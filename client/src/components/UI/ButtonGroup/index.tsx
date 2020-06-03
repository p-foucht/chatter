import React from "react";
import classNames from "classnames";

import styles from "./styles";

export interface Props {
  stacked?: boolean;
  className?: string;
}

const ButtonGroup: React.FC<Props> = ({ children, stacked }) => {
  const classes = classNames(styles.wrapper, classNames, {
    [styles.stacked]: stacked,
  });

  return <div className={classes}>{children}</div>;
};

export default ButtonGroup;
