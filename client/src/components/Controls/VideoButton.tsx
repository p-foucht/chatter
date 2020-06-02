import React from 'react';
import { MdVideocam, MdVideocamOff } from 'react-icons/md';

import IconButton from '../UI/IconButton';
import Tooltip from '../UI/Tooltip';
import {
  useLocalVideoState,
  useToggleLocalVideo,
} from '../../providers/LocalVideoProvider';

const VideoButton = () => {
  const toggleVideo = useToggleLocalVideo();
  const { isActive } = useLocalVideoState();
  const label = isActive ? 'Stop my video' : 'Start my video';

  return (
    <Tooltip tooltip={label}>
      <IconButton
        className='mute-button'
        icon={isActive ? <MdVideocam /> : <MdVideocamOff />}
        onClick={toggleVideo}
        label={label}
      />
    </Tooltip>
  );
};

export default VideoButton;
