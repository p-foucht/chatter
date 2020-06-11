import React from 'react';

import RemoteCanvas from './RemoteCanvas';
import LocalCanvas from './LocalCanvas';

// Todo - Render when whiteboard is selected
const Whiteboard = () => {
  return (
    <>
      <RemoteCanvas />
      <LocalCanvas />
    </>
  );
};

export default Whiteboard;
