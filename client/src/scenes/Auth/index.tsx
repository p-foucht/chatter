import React from "react";
import { withRouter } from "react-router-dom";

import Signup from "../../components/Auth/Signup";
import Login from "../../components/Auth/Login";
import Slider from "../../components/Auth/Slider";

import styles from "./styles";
import { useAuth } from "../../providers/AuthProvider";

type Props = {
  match: any;
};

const Auth = (props: Props) => {
  const { mode } = props.match.params;
  const { loading } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={loading ? { pointerEvents: "none", opacity: "0.7" } : {}}
      >
        <div className={styles.left}>
          {mode === "signup" ? <Signup /> : <Login />}
        </div>

        <div className={styles.right}>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Auth);
