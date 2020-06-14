import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdVideocam, MdAdd } from 'react-icons/md';

import styles from './styles';

const Home = () => {
  const history = useHistory();

  const joinMeetingHandler = () => {
    const response = prompt('What meeting would you like to join?');
    if (response) {
      history.push(`/meeting/${response}`);
    }
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Link className={styles.box} to="/meeting/zawarudo">
          <MdVideocam className={styles.icon} />
        </Link>
        <div className={styles.box} onClick={joinMeetingHandler}>
          <MdAdd className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Home;
