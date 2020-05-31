import React from "react";

type Variant = "primary" | "secondary";

interface Props {
  variant: Variant;
}

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
