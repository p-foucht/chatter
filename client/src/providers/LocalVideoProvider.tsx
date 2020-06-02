import React, { useState, createContext, useContext, useCallback } from 'react';

import { useAudioVideo } from './MeetingStatusProvider';

interface LocalVideoState {
  isActive: boolean;
  tileId?: number | null;
}

type ToggleVideo = () => void;

const ApiContext = createContext<ToggleVideo>(() => {});
const StateContext = createContext<LocalVideoState>({ isActive: false });

const LocalVideoProvider: React.FC = ({ children }) => {
  const av = useAudioVideo();
  const [state, setState] = useState<LocalVideoState>({
    isActive: false,
    tileId: null,
  });

  const api = useCallback(() => {
    if (state.isActive) {
      av?.stopLocalVideoTile();
      setState((current) => ({ ...current, isActive: false }));
    } else {
      av?.startLocalVideoTile();
      setState((current) => ({ ...current, isActive: true }));
    }
  }, [av, state.isActive]);

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
