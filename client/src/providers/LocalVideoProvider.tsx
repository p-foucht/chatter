import React, { useState, createContext, useContext, useCallback } from 'react';

import { useAudioVideo } from './MeetingStatusProvider';
import { useChime } from './ChimeProvider';

interface LocalVideoState {
  isActive: boolean;
  tileId?: number | null;
}

type ToggleVideo = () => void;

const ApiContext = createContext<ToggleVideo>(() => {});
const StateContext = createContext<LocalVideoState>({ isActive: false });

const LocalVideoProvider: React.FC = ({ children }) => {
  const av = useAudioVideo();
  const chime = useChime();
  const [state, setState] = useState<LocalVideoState>({
    isActive: false,
    tileId: null,
  });

  const api = useCallback(async () => {
    if (state.isActive) {
      av?.stopLocalVideoTile();
      setState((current) => ({ ...current, isActive: false }));
    } else {
      if (!chime.currentVideoInputDevice) {
        console.log('No selected video input device. Cannot start video');
        return;
      }
      await chime.chooseCurrentVideoInputDevice();
      av?.startLocalVideoTile();
      setState((current) => ({ ...current, isActive: true }));
    }
  }, [av, chime, state.isActive]);

  return (
    <ApiContext.Provider value={api}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ApiContext.Provider>
  );
};

const useToggleLocalVideo = (): ToggleVideo => {
  const api = useContext(ApiContext);

  return api;
};

const useLocalVideoState = () => {
  const state = useContext(StateContext);

  return state;
};

export { LocalVideoProvider, useToggleLocalVideo, useLocalVideoState };
