import React from "react";

import styles from "./styles";

type Props = {
  author: string;
  timestamp: string;
  text: string;
};

const Message = (props: Props) => {
  return (
    <div className={styles.message}>
      <div className={styles.row}>
        <span className={styles.author}>{props.author}</span>
        <span className={styles.timestamp}>{props.timestamp}</span>
      </div>
      <p className={styles.text}>{props.text}</p>
    </div>
  );
};

export default Message;
