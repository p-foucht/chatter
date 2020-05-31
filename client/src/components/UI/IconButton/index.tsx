import React, { ReactNode } from "react";
import classNames from "classnames";

import "./index.css";

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
  const classes = classNames("button", className);

  return (
    <button className={classes} {...rest} aria-label={label}>
      <span className="icon">{Icon}</span>
    </button>
  );
};

export default Button;
