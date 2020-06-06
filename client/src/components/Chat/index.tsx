import React from "react";

import MessageList from "./MessageList";
import ChatInputWrapper from "./ChatInputWrapper";

import styles from "./styles";

const Chat = () => {
  return (
    <div className={styles.chat}>
      <MessageList />
      <ChatInputWrapper />
    </div>
  );
};

export default Chat;
