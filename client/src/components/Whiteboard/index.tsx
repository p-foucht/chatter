import React, { useState } from 'react';

import RemoteCanvas from './RemoteCanvas';
import LocalCanvas from './LocalCanvas';
import Controls from './Controls';
import CanvasManager from './CanvasManager';
import { useWhiteboardState } from '../../hooks/whiteboard';

const Whiteboard = () => {
  const [{ isActive }] = useWhiteboardState();
  const [managers] = useState(() => ({
    local: new CanvasManager(),
    remote: new CanvasManager(),
  }));

  return (
    <>
      {isActive && <Controls managers={managers} />}
      <RemoteCanvas canvasManager={managers.remote} />
      {isActive && <LocalCanvas canvasManager={managers.local} />}
    </>
  );
};

export default Whiteboard;
