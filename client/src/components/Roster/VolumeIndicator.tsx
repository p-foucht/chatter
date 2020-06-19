import React from 'react';
import { MdMic } from 'react-icons/md';
import useRealtimeVolume from '../../hooks/useRealtimeVolume';
import styles from './styles';

interface Props {
  name: string;
  id: string;
}

const VolumeIndicator: React.FC<Props> = ({ name, id }) => {
  const { volume } = useRealtimeVolume(id);
  return volume > 0.25 ? (
    <MdMic className={styles.indicator} color='#49b482' size={20} />
  ) : (
    <MdMic className={styles.indicator} color='#888' size={20} />
  );
};

export default VolumeIndicator;
