import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { whiteboardState } from '../../state/whiteboard';

const useToggleWhiteboard = () => {
  const [{ isActive }, setState] = useRecoilState(whiteboardState);

  const toggleWhiteboard = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      isActive: !currentState.isActive,
    }));
  }, [setState]);

  return { isActive, toggleWhiteboard };
};

export default useToggleWhiteboard;
