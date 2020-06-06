import React from "react";

import { MdTagFaces, MdAttachFile } from "react-icons/md";
import ChatInput from "./ChatInput";

import styles from "./styles";

//Eventually need to handle file drop and choosing emojis, a good library is emoji-picker-react

const ChatInputWrapper = () => (
  <div className={styles.inputWrapper}>
    <div className={styles.inputOptions}>
      <MdTagFaces className={styles.optionIcon} />
      <MdAttachFile className={styles.optionIcon} />
    </div>
    <ChatInput />
  </div>
);

export default ChatInputWrapper;
