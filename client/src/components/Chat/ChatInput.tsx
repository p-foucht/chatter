import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';

import { useSendChatMessage } from '../../providers/MessagingProvider';
import { useAuth } from '../../providers/AuthProvider';

import styles from './styles';

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const ChatInput = () => {
  const { username } = useAuth();
  const sendChatMessage = useSendChatMessage();
  const [text, setText] = useState('');

  const sendHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (text) {
      sendChatMessage({
        text,
        author: username,
        timestamp: formatAMPM(new Date()),
      });
      setText('');
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
