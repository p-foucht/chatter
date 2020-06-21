import React from 'react';
import classNames from 'classnames';
import { MdThumbsUpDown } from 'react-icons/md';
import { BsChatDotsFill, BsPeopleFill } from 'react-icons/bs';

import { View } from './index';

import styles from './styles';

type Props = {
  view: string;
  setView: (val: View) => void;
};

const Nav = (props: Props) => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === 'chat',
        })}
        onClick={() => props.setView('chat')}
      >
        <BsChatDotsFill className={styles.icon} />
      </li>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === 'roster',
        })}
        onClick={() => props.setView('roster')}
      >
        <BsPeopleFill className={styles.icon} />
      </li>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === 'reaction',
        })}
        onClick={() => props.setView('reaction')}
      >
        <MdThumbsUpDown className={styles.icon} />
      </li>
    </ul>
  </nav>
);

export default Nav;
