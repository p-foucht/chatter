import React from 'react';

import RemoteCanvas from './RemoteCanvas';
import LocalCanvas from './LocalCanvas';
import Controls from './Controls';
import { useWhiteboardState } from '../../hooks/whiteboard';

const Whiteboard = () => {
  const [{ isActive }] = useWhiteboardState();

  return isActive ? (
    <>
      <Controls />
      <RemoteCanvas />
      <LocalCanvas />
    </>
  ) : null;
};

export default Whiteboard;
