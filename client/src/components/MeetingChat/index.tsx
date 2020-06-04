import React, { useState } from "react";

import {
  useSendChatMessage,
  useChatMessages,
} from "../../providers/MessagingProvider";

// Placeholder for testing

const MeetingChat = () => {
  const sendMessage = useSendChatMessage();
  const messages = useChatMessages();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <ul>
        {messages.map((message: any) => (
          <li>{JSON.stringify(message)}</li>
        ))}
      </ul>

      <input value={message} onChange={handleChange} />
      <button onClick={() => sendMessage(message)}>Submit</button>
    </div>
  );
};

export default MeetingChat;
