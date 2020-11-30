import React from 'react';
import { BsChatDotsFill } from 'react-icons/bs';

import ControlButton from './ControlButton';

import { useSideNav } from '../../providers/SideNavProvider';

const ChatButton = () => {
  const { isOpen, setOpen } = useSideNav();

  const label = isOpen ? 'Close chat' : 'Open Chat';

  return (
    <ControlButton
      icon={<BsChatDotsFill />}
      onClick={() => setOpen(!isOpen)}
      label={label}
    />
  );
};

export default ChatButton;
