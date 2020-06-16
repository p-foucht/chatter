import React from 'react';
import { MdChat } from 'react-icons/md';

import ControlButton from './ControlButton';

import { useSideNav } from '../../providers/SideNavProvider';

const ChatButton = () => {
  const { isOpen, setOpen } = useSideNav();

  const label = isOpen ? 'Close chat' : 'Open Chat';

  return (
    <ControlButton
      icon={isOpen ? <MdChat /> : <MdChat />}
      onClick={() => setOpen(!isOpen)}
      label={label}
    />
  );
};

export default ChatButton;
