import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import LabelInput from "../UI/LabelInput/LabelInput";
import { useAuth } from "../../providers/AuthProvider";

import styles from "./styles";
import Logo from "../UI/Logo/Logo";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const { authenticate } = useAuth();

  const onSubmit = (data: any) => {
    authenticate({ ...data, mode: "login" });
  };

  return (
    <>
      <Logo margin="0 0 4rem 0" />
      <h2 className={styles.header}>Log in</h2>
      <span className={styles.subheader}>
        Log in with your data that you entered during registration.
      </span>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          label="Your username"
          placeholder="username"
          name="username"
          errors={errors.username}
          ref={register({ required: "Required" })}
        />

        <LabelInput
          label="Password"
          name="password"
          type="password"
          placeholder="password"
          ref={register({ required: "Required" })}
          errors={errors.password}
        />

        <div className={styles.checkboxRow}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="persist"
            ref={register}
          />
          <label className={styles.checkboxLabel}>Keep me logged in.</label>
        </div>

        <button className={styles.btn} type="submit">
          Log in
        </button>
      </form>

      <p className={styles.switchText}>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.primaryColor}>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
