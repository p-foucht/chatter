import React from 'react';
import { GoPencil } from 'react-icons/go';

import { useToggleWhiteboard } from '../../hooks/whiteboard';
import ControlButton from './ControlButton';

const WhiteboardButton = () => {
  const { isActive, toggleWhiteboard } = useToggleWhiteboard();
  const label = isActive ? 'Stop whiteboarding' : 'Start whiteboarding';

  return (
    <ControlButton
      icon={<GoPencil />}
      onClick={toggleWhiteboard}
      label={label}
    />
  );
};

export default WhiteboardButton;
