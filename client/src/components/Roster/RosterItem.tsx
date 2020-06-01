import React from "react";
import VolumeIndicator from "./VolumeIndicator";
import styles from "./styles";

interface Props {
  name: string;
  id: string;
}

const RosterItem: React.FC<Props> = ({ name, id }) => {
  return (
    <li key={id} className={styles.item}>
      {name} <VolumeIndicator name={name} id={id} />
    </li>
  );
};

export default RosterItem;
