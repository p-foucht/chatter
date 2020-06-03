import React from "react";

import LocalVideo from "../LocalVideo/LocalVideo";
import ControlBar from "../Controls/ControlBar";
import ContentShare from "../ContentShare";

const MeetingCanvas = () => (
  <>
    <ContentShare />
    <LocalVideo />
    <ControlBar />
  </>
);

export default MeetingCanvas;
