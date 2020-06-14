import React from 'react';

import {
  useAudioInputs,
  useAudioOutputs,
  useVideoInputs,
  useSelectDevice,
} from '../../providers/DevicesProvider';

import Menu from '../UI/Menu';

const AudioInputList = () => {
  const audioInputs = useAudioInputs();
  const onClick = useSelectDevice('audio-input');

  return (
    <DeviceList title="Audio input" onClick={onClick} devices={audioInputs} />
  );
};

const AudioOutputList = () => {
  const audioOutputs = useAudioOutputs();
  const onClick = useSelectDevice('audio-input');

  return (
    <DeviceList title="Audio output" onClick={onClick} devices={audioOutputs} />
  );
};

const VideoInputList = () => {
  const videoInputs = useVideoInputs();
  const onClick = useSelectDevice('video-input');

  return (
    <DeviceList title="Video input" onClick={onClick} devices={videoInputs} />
  );
};

const DeviceList = ({ devices, onClick, title }) => (
  <Menu.ItemGroup title={title}>
    {devices.map((device) => (
      <Menu.Item onClick={() => onClick(device)}>{device.label}</Menu.Item>
    ))}
  </Menu.ItemGroup>
);

const DevicePicker = () => (
  <Menu>
    <AudioInputList />
    <AudioOutputList />
    <VideoInputList />
  </Menu>
);

export default DevicePicker;
