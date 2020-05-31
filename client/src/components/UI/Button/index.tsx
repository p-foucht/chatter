import React from "react";
import classNames from "classnames";

import styles from "./styles";

type Variant = "primary" | "secondary";

interface Props {
  variant: Variant;
  className?: string;
}

const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  const classes = classNames(className, styles.button);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
