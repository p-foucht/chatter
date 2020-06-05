import React from "react";

import Message from "./Message";
import { useChatMessages } from "../../providers/MessagingProvider";

const MessageList = () => {
  const chatMessages = useChatMessages();

  const messages = chatMessages.map((el, index) => (
    <Message
      key={index}
      text={el}
      author="Peyton Foucht"
      timestamp="11:58 AM"
    />
  ));

  return <div>{messages}</div>;
};

export default MessageList;
