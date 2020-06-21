import React, { useEffect, useRef } from 'react';

import Message from './Message';
import EntranceMessage from './EntranceMessage';
import { useChatMessages } from '../../../providers/MessagingProvider';

import styles from '../styles';

const MessageList = () => {
  const chatMessages = useChatMessages();
  const bottomEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const messages = chatMessages.map(
    (
      el: {
        text: string;
        author: string;
        timestamp: string;
        entrance?: boolean;
      },
      index: number
    ) => {
      if (el.entrance) {
        return <EntranceMessage key={index} text={el.text} />;
      }

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

      <div style={{ float: 'left', clear: 'both' }} ref={bottomEl}></div>
    </div>
  );
};

export default MessageList;
