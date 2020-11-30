import React from 'react';

import { AudioInputProvider, useAudioInputs } from './AudioInputProvider';
import { AudioOutputProvider, useAudioOutputs } from './AudioOutputProvider';
import { VideoInputProvider, useVideoInputs } from './VideoInputProvider';
import { useChime } from '../ChimeProvider';

const DevicesProvider: React.FC = ({ children }) => {
  return (
    <AudioInputProvider>
      <AudioOutputProvider>
        <VideoInputProvider>{children}</VideoInputProvider>
      </AudioOutputProvider>
    </AudioInputProvider>
  );
};

type DeviceType = 'audio-input' | 'audio-output' | 'video-input';

const useSelectDevice = (deviceType: DeviceType) => {
  const chime = useChime();

  if (deviceType === 'audio-input') {
    return (device) => chime.chooseAudioInputDevice(device);
  }

  if (deviceType === 'audio-output') {
    return (device) => chime.chooseAudioOutputDevice(device);
  }

  if (deviceType === 'video-input') {
    return (device) => chime.chooseVideoInputDevice(device);
  }
};

export {
  DevicesProvider,
  useAudioInputs,
  useAudioOutputs,
  useVideoInputs,
  useSelectDevice,
};
