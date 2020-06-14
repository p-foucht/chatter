import { useRecoilState } from 'recoil';

import { whiteboardState } from '../../state/whiteboard';

const useWhiteboardState = () => {
  const state = useRecoilState(whiteboardState);

  return state;
};

export default useWhiteboardState;
