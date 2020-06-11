import React from "react";

import styles from "./styles";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  errors: any;
  errorMessage?: string;
  type?: string;
};

const LabelInput = React.forwardRef((props: Props, ref: any) => (
  <>
    <label className={styles.label}>
      {props.label}{" "}
      <span className={styles.error}>
        {props.errors && (props.errors.message || props.errorMessage)}
      </span>
    </label>
    <input
      style={props.errors ? { border: "1px solid red" } : {}}
      className={styles.input}
      name={props.name}
      type={props.type || "text"}
      placeholder={props.placeholder}
      ref={ref}
    />
  </>
));

export default LabelInput;
