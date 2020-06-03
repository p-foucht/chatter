import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { DefaultModality, VideoTileState } from "amazon-chime-sdk-js";

import { initialState, ContentState } from "./state";
import { useAudioVideo } from "../MeetingStatusProvider";
import { useChime } from "../ChimeProvider";

const StateContext = createContext<ContentState>(initialState);

const ApiContext = createContext({
  startContentShare: () => {},
  stopContentShare: () => {},
});

const ContentShareProvider: React.FC = ({ children }) => {
  const chime = useChime();
  const av = useAudioVideo();
  const [state, setState] = useState(initialState);
  const {
    isLocalUserSharing,
    isLocalShareLoading,
    activeContentTileId,
  } = state;

  const api = useMemo(
    () => ({
      startContentShare: async () => {
        setState((localState: ContentState) => ({
          ...localState,
          isLocalShareLoading: true,
        }));
        av?.startContentShareFromScreenCapture();
      },
      stopContentShare: async () => {
        av?.stopContentShare();
      },
    }),
    [av]
  );

  useEffect(() => {
    if (!av) {
      return;
    }

    const videoCb = {
      videoTileDidUpdate: (tileState: VideoTileState) => {
        if (
          !tileState.boundAttendeeId ||
          !tileState.isContent ||
          !tileState.tileId
        ) {
          return;
        }

        const { boundAttendeeId } = tileState;
        const baseAttendeeId = new DefaultModality(boundAttendeeId).base();
        const localAttendeeId = chime?.configuration?.credentials?.attendeeId;
        const isLocalUser = baseAttendeeId === localAttendeeId;

        if (!isLocalUser && isLocalUserSharing) {
          av.stopContentShare();
        }

        if (isLocalUser) {
          setState((localState: ContentState) => ({
            ...localState,
            activeContentTileId: tileState.tileId,
            isLocalShareLoading: false,
            isLocalUserSharing: true,
            isSomeoneSharing: true,
          }));
        } else {
          setState((localState: ContentState) => ({
            ...localState,
            activeContentTileId: tileState.tileId,
            isRemoteUserSharing: true,
            isSomeoneSharing: true,
          }));
        }
      },
      videoTileWasRemoved: (tileId: number) => {
        if (tileId === activeContentTileId) {
          setState(initialState);
        }
      },
    };

    const screenShareCb = {
      contentShareDidStart: () => {
        setState((localState: ContentState) => ({
          ...localState,
          isLocalShareLoading: false,
          isLocalUserSharing: true,
        }));
      },
      contentShareDidStop: () => {
        setState((localState: ContentState) => ({
          ...localState,
          isLocalUserSharing: false,
        }));
      },
    };

    av.addObserver(videoCb);
    av.addContentShareObserver(screenShareCb);

    return () => {
      av.removeObserver(videoCb);
      av.removeContentShareObserver(screenShareCb);
    };
  }, [chime, av, activeContentTileId, isLocalUserSharing]);

  useEffect(() => {
    const cb = (event: PromiseRejectionEvent) => {
      if (event.reason.name === "NotAllowedError" && isLocalShareLoading) {
        setState((localState: ContentState) => ({
          ...localState,
          isLocalShareLoading: false,
        }));
      }
    };

    window.addEventListener("unhandledrejection", cb);
    return () => window.removeEventListener("unhandledrejection", cb);
  }, [isLocalShareLoading]);

  return (
    <StateContext.Provider value={state}>
      <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    </StateContext.Provider>
  );
};

const useContentShareState = () => {
  const state = useContext(StateContext);

  return state;
};

const useContentShareApi = () => {
  const api = useContext(ApiContext);
  return api;
};

const useToggleContentShare = (): (() => void) => {
  const { isLocalShareLoading, isLocalUserSharing } = useContentShareState();
  const api = useContentShareApi();

  const toggleContentShare = useCallback(() => {
    if (isLocalShareLoading) {
      return;
    }

    if (isLocalUserSharing) {
      api.stopContentShare();
    } else {
      api.startContentShare();
    }
  }, [isLocalShareLoading, isLocalUserSharing, api]);

  return toggleContentShare;
};

export {
  ContentShareProvider,
  useContentShareState,
  useContentShareApi,
  useToggleContentShare,
};
