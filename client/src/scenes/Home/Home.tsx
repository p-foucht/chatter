import React from "react";
import { Link } from "react-router-dom";
import { MdVideocam, MdAdd } from "react-icons/md";
import styles from "./styles";

const Home = () => (
  <div>
    <div className={styles.wrapper}>
      <Link className={styles.box} to="/meeting">
        <MdVideocam className={styles.icon} />
      </Link>
      <Link className={styles.box} to="/meeting">
        <MdAdd className={styles.icon} />
      </Link>
    </div>
  </div>
);

export default Home;
