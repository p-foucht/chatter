import React from "react";
import { MdVolumeDown, MdVolumeUp } from "react-icons/md";
import useRealtimeVolume from "../../hooks/useRealtimeVolume";
import styles from "./styles";

interface Props {
  name: string;
  id: string;
}

const VolumeIndicator: React.FC<Props> = ({ name, id }) => {
  const { volume } = useRealtimeVolume(id);
  return volume > 0.25 ? (
    <MdVolumeUp className={styles.indicator} color="#49b482" />
  ) : (
    <MdVolumeDown className={styles.indicator} />
  );
};

export default VolumeIndicator;
