import React from 'react';
import classNames from 'classnames';
import { MdChat, MdGroup, MdThumbsUpDown } from 'react-icons/md';

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
        <MdChat className={styles.icon} />
        <span>Chatroom</span>
      </li>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === 'roster',
        })}
        onClick={() => props.setView('roster')}
      >
        <MdGroup className={styles.icon} />
        <span>Viewers</span>
      </li>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === 'reaction',
        })}
        onClick={() => props.setView('reaction')}
      >
        <MdThumbsUpDown className={styles.icon} />
        <span>Reactions</span>
      </li>
    </ul>
  </nav>
);

export default Nav;
