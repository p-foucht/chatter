import React from "react";

import Message from "./Message";
import { useChatMessages } from "../../providers/MessagingProvider";

// The author and timestamp are hardcoded in. Eventually need to modify
// useChatMessages to give an array of objects with text, author, and timestamp.

const MessageList = () => {
  const chatMessages = useChatMessages();

  const messages = chatMessages.map(
    (
      el: { text: string; author: string; timestamp: string },
      index: number
    ) => (
      <Message
        key={index}
        text={el.text}
        author={el.author}
        timestamp={el.timestamp}
      />
    )
  );

  return <div>{messages}</div>;
};

export default MessageList;
