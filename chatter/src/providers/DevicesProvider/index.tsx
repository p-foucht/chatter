import React from "react";

import { AudioInputProvider, useAudioInputs } from "./AudioInputProvider";
import { AudioOutputProvider, useAudioOutputs } from "./AudioOutputProvider";
import { VideoInputProvider, useVideoInputs } from "./VideoInputProvider";

const DevicesProvider: React.FC = ({ children }) => {
  return (
    <AudioInputProvider>
      <AudioOutputProvider>
        <VideoInputProvider>{children}</VideoInputProvider>
      </AudioOutputProvider>
    </AudioInputProvider>
  );
};

export { DevicesProvider, useAudioInputs, useAudioOutputs, useVideoInputs };
