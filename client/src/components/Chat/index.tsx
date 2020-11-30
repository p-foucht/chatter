import React from 'react';

import MessageList from './Messages/MessageList';
import ChatInputWrapper from './Input/ChatInputWrapper';

import styles from './styles';

const Chat = () => {
  return (
    <div className={styles.chat}>
      {/* <h3 className={styles.title}>Meeting Chat</h3> */}
      <MessageList />
      <ChatInputWrapper />
    </div>
  );
};

export default Chat;
