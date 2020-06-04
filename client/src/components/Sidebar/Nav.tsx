import React from "react";
import classNames from "classnames";
import { MdChat, MdGroup } from "react-icons/md";

import View from "./index";

import styles from "./styles";

type Props = {
  view: string;
  setView: (View) => void;
};

const Nav = (props: Props) => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === "chat",
        })}
        onClick={() => props.setView("chat")}
      >
        <MdChat className={styles.icon} />
      </li>
      <li
        className={classNames(styles.item, {
          [styles.active]: props.view === "roster",
        })}
        onClick={() => props.setView("roster")}
      >
        <MdGroup className={styles.icon} />
      </li>
    </ul>
  </nav>
);

export default Nav;
