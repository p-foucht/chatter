import React from "react";
import { withRouter } from "react-router-dom";

import Signup from "../../components/Auth/Signup";
import Login from "../../components/Auth/Login";
import Carousel from "../../components/Auth/Carousel";
import { useAuth } from "../../providers/AuthProvider";

import styles from "./styles";

type Props = {
  match: any;
};

const Auth = (props: Props) => {
  const { mode } = props.match.params;
  const { isLoading } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={isLoading ? { pointerEvents: "none", opacity: "0.7" } : {}}
      >
        <div className={styles.left}>
          {mode === "signup" ? <Signup /> : <Login />}
        </div>

        <div className={styles.right}>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Auth);
