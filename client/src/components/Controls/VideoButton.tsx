import React from 'react';
import { MdVideocam, MdVideocamOff } from 'react-icons/md';

import ControlButton from './ControlButton';
import {
  useLocalVideoState,
  useToggleLocalVideo,
} from '../../providers/LocalVideoProvider';

const VideoButton = () => {
  const toggleVideo = useToggleLocalVideo();
  const { isActive } = useLocalVideoState();
  const label = isActive ? 'Stop my video' : 'Start my video';

  return (
    <ControlButton
      icon={isActive ? <MdVideocam /> : <MdVideocamOff />}
      onClick={toggleVideo}
      label={label}
    />
  );
};

export default VideoButton;
