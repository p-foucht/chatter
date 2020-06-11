import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import LabelInput from "../UI/LabelInput/LabelInput";
import { useAuth } from "../../providers/AuthProvider";

import styles from "./styles";
import Logo from "../UI/Logo/Logo";

const Signup = (props) => {
  const { authenticate } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    authenticate({ ...data, mode: "signup" });
  };

  return (
    <>
      <Logo margin="0 0 4rem 0" />
      <h2 className={styles.header}>Sign up</h2>
      <span className={styles.subheader}>
        Give us some of your information to begin tutoring.
      </span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          label="Your username"
          placeholder="Dio Brando"
          name="username"
          errors={errors.username}
          errorMessage="Username must be at least 4 characters"
          ref={register({ required: "Required", minLength: 4 })}
        />

        <LabelInput
          label="Your e-mail"
          name="email"
          placeholder="dio@zawarudo.com"
          type="email"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          errors={errors.email}
        />

        <LabelInput
          label="Password"
          name="password"
          type="password"
          placeholder="at least 6 characters"
          ref={register({ required: "Required", minLength: 6 })}
          errors={errors.password}
          errorMessage="Password must be at least 6 characters"
        />

        <div className={styles.checkboxRow}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="terms"
            ref={register}
          />
          <label className={styles.checkboxLabel}>
            By creating an account you agree to the{" "}
            <span className={styles.terms}>terms of use</span> and our{" "}
            <span className={styles.terms}>privacy policy.</span>
          </label>
        </div>

        <button className={styles.btn} type="submit">
          Create account
        </button>
      </form>
      <p className={styles.switchText}>
        Already have an account?{" "}
        <Link to="/login" className={styles.primaryColor}>
          Log in
        </Link>
      </p>
    </>
  );
};

export default Signup;
