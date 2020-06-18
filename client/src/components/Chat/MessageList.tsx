import React, { useEffect } from 'react';

import Message from './Message';
import { useChatMessages } from '../../providers/MessagingProvider';

import styles from './styles';

const MessageList = () => {
  const chatMessages = useChatMessages();

  let messagesEnd: any = {};

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEnd.scrollIntoView({ behaivor: 'smooth ' });
    };
    scrollToBottom();
  }, [chatMessages, messagesEnd]);

  const messages = chatMessages.map(
    (
      el: { text: string; author: string; timestamp: string },
      index: number
    ) => {
      let continued = false;

      if (index > 0) {
        continued =
          chatMessages[index].author === chatMessages[index - 1].author &&
          chatMessages[index].timestamp === chatMessages[index - 1].timestamp;
      }

      return (
        <Message
          continued={continued}
          key={index}
          text={el.text}
          author={el.author}
          timestamp={el.timestamp}
        />
      );
    }
  );

  return (
    <div className={styles.messageList}>
      {messages}

      <div
        style={{ float: 'left', clear: 'both' }}
        ref={(el) => {
          messagesEnd = el;
        }}
      ></div>
    </div>
  );
};

export default MessageList;
