import React, { ReactNode } from "react";
import classNames from "classnames";

import styles from "./styles";

type Variant = "primary" | "secondary";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
  icon: ReactNode;
  label: string;
}

const Button: React.FC<Props> = ({
  className,
  icon: Icon,
  label,
  children,
  ...rest
}) => {
  const classes = classNames(styles.button, className);

  return (
    <button className={classes} {...rest} aria-label={label}>
      <span className={styles.icon}>{Icon}</span>
    </button>
  );
};

export default Button;
