import React from "react";

import logo from "../../../assets/logo-placeholder.png";

type Props = {
  margin: string;
};

const Logo = (props: Props) => (
  <img
    src={logo}
    style={{ width: "100px", margin: props.margin }}
    alt="tudor.io"
  />
);

export default Logo;
