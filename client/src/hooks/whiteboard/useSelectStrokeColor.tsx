import { useCallback } from 'react';

import useWhiteboardState from './useWhiteboardState';

const useSelectStrokeColor = () => {
  const [{ strokeColor }, setState] = useWhiteboardState();

  const selectColor = useCallback(
    (color: string) => {
      setState((currenState) => ({ ...currenState, strokeColor: color }));
    },
    [setState]
  );

  return { selectColor, strokeColor };
};

export default useSelectStrokeColor;
