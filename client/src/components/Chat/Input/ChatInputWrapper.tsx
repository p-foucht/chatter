import React, { useState } from 'react';
import { MdTagFaces, MdAttachFile } from 'react-icons/md';

import ChatInput from './ChatInput';
import EmojiPicker from './EmojiPicker';

import styles from '../styles';

//Eventually need to handle file drop and choosing emojis, a good library is emoji-picker-react

const ChatInputWrapper = () => {
  const [text, setText] = useState('');
  const [isPickerOpen, setPickerOpen] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setText((previousText) => previousText + ':' + emojiObject.id + ': ');
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputOptions}>
        <div style={{ position: 'relative' }}>
          <MdTagFaces
            className={styles.optionIcon}
            onClick={() => setPickerOpen(!isPickerOpen)}
          />
          {isPickerOpen ? (
            <EmojiPicker
              isPickerOpen={isPickerOpen}
              setPickerOpen={setPickerOpen}
              onEmojiClick={onEmojiClick}
            />
          ) : null}
        </div>
        <MdAttachFile className={styles.optionIcon} />
      </div>
      <ChatInput text={text} setText={setText} />
    </div>
  );
};

export default ChatInputWrapper;
