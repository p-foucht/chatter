import React from 'react';

import Message from './Message';
import { useChatMessages } from '../../providers/MessagingProvider';

// The author and timestamp are hardcoded in. Eventually need to modify
// useChatMessages to give an array of objects with text, author, and timestamp.

const MessageList = () => {
  const chatMessages = useChatMessages();

  const messages = chatMessages.map((el: string, index: number) => (
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
