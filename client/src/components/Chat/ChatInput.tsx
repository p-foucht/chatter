import React, { useState } from "react";
import { MdSend } from "react-icons/md";

import { useSendChatMessage } from "../../providers/MessagingProvider";

import styles from "./styles";

const ChatInput = () => {
  const sendChatMessage = useSendChatMessage();
  const [text, setText] = useState("");

  const sendHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (text) {
      sendChatMessage(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={sendHandler} className={styles.inputBackground}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Send a message"
        />
        <button type="submit" className={styles.sendBtn}>
          <MdSend className={styles.sendIcon} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
