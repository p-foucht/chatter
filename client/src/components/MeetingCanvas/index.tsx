import React from 'react';

import LocalVideo from '../LocalVideo/LocalVideo';
import ControlBar from '../Controls/ControlBar';
import ContentShare from '../ContentShare';
import Whiteboard from '../Whiteboard';

const MeetingCanvas = () => (
  <>
    <Whiteboard />
    <ContentShare />
    <LocalVideo />
    <ControlBar />
  </>
);

export default MeetingCanvas;
