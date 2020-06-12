import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { FaPaintBrush } from 'react-icons/fa';

import { useSelectColor } from '../../../../hooks/whiteboard';
import ControlButton from '../ControlButton';

import styles from './styles';

const Controls = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Two color states are required to update the picker UI
  // while not updating the global state on every drag event
  const { strokeColor, selectColor } = useSelectColor();
  const [localColor, setLocalColor] = useState(strokeColor);

  return (
    <>
      <div className={styles.colorPopup}>
        {isOpen && (
          <ChromePicker
            color={localColor}
            onChangeComplete={(colorData) => selectColor(colorData.hex)}
            onChange={(colorData) => setLocalColor(colorData.hex)}
          />
        )}
      </div>

      <ControlButton
        aria-haspopup
        aria-expanded={isOpen}
        label={isOpen ? 'Close color picker' : 'Open color picker'}
        icon={<FaPaintBrush />}
        onClick={() => setIsOpen((open) => !open)}
      />
    </>
  );
};

export default Controls;
