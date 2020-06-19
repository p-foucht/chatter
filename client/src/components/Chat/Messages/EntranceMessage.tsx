import React from 'react';
import { Emoji } from 'emoji-mart';

import styles from '../styles';

type Props = {
  text: string;
};

// Just a temporary thing as I test out entrance messages
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

const EntranceMessage = (props: Props) => {
  return (
    <div className={styles.entranceRow}>
      <p className={styles.entranceContent}>
        <Emoji emoji='sunglasses' size={24} />
        <span className={styles.entranceText}>{props.text}</span>
        <Emoji emoji='sunglasses' size={24} />
      </p>
      <span className={styles.timestamp}>{formatAMPM(new Date())}</span>
    </div>
  );
};

export default EntranceMessage;
