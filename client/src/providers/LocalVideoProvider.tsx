import React, {
  useMemo,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

import { useAudioVideo } from "./MeetingStatusProvider";

interface TileApi {
  startLocalVideo?: () => void;
  stopLocalVideo?: () => void;
}

interface LocalTileSTate {
  isActive: boolean;
  tileId?: number;
}

const ApiContext = createContext<TileApi>({});
const StateContext = createContext<LocalTileSTate>({ isActive: false });

const LocalVideoProvider = () => {
  const av = useAudioVideo();
  const [state, setState] = useState<any>({
    active: false,
    tileId: null,
  });

  const api = useMemo(
    () => ({
      startLocalVideo: () => {
        try {
          av?.startLocalVideoTile();
          setState((current) => ({ ...current, active: true }));
        } catch (e) {
          console.log(`Something went wrong - ${e.message}`);
          av?.startLocalVideoTile();
        }
      },
      stopLocalVideo: () => {
        av?.stopLocalVideoTile();
        setState((current) => ({ ...current, active: false }));
      },
    }),
    []
  );

  return (
    <ApiContext.Provider value={api}>
      <StateContext.Provider value={state}></StateContext.Provider>
    </ApiContext.Provider>
  );
};

const useLocalTileApi = () => {
  const api = useContext(ApiContext);

  return api;
};

const useLocalTileState = () => {
  const state = useContext(StateContext);

  return state;
};

export { LocalVideoProvider, useLocalTileApi, useLocalTileState };
