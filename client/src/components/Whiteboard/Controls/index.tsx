import React from 'react';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';

import ColorPicker from './ColorPicker';
import Portal from '../../Portal';

import styles from './styles';

// Todo - undo/redo buttons
const Controls = () => {
  return (
    <Portal root="whiteboard-root">
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <ColorPicker />
        </div>
        <div className={styles.item}>
          <IoIosUndo />
        </div>
        <div className={styles.item}>
          <IoIosRedo />
        </div>
      </div>
    </Portal>
  );
};

export default Controls;
