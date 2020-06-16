import React from 'react';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';
import styles from './styles';

type Props = {
  author: string;
  timestamp: string;
  text: string;
  continued: boolean;
};

function generateContent(text: string) {
  var re = /(\:[^]+\:)/g;
  let arr = text.split(re).filter(Boolean);

  let emojiOnly = arr.every(
    (el) => (el.startsWith(':') && el.endsWith(':')) || el === ' '
  );

  let content = arr.map((el, index) => {
    if (el.startsWith(':') && el.endsWith(':')) {
      return <Emoji key={index} emoji={el} size={emojiOnly ? 32 : 18} />;
    }
    return el;
  });
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>{content}</span>
  );
}

const Message = (props: Props) => {
  let content = generateContent(props.text);

  let classes = classNames(styles.message, {
    [styles.continued]: props.continued,
  });

  let messageHeader = !props.continued ? (
    <div className={styles.row}>
      <span className={styles.author}>{props.author}</span>
      <span className={styles.timestamp}>{props.timestamp}</span>
    </div>
  ) : null;

  return (
    <div className={classes}>
      {messageHeader}
      <p className={styles.text}>{content}</p>
    </div>
  );
};

export default Message;
