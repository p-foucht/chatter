import { VideoTileState } from "amazon-chime-sdk-js";
import classNames from "classnames/bind";
import React, { useContext, useEffect, useRef, useState } from "react";

// import getChimeContext from "../context/getChimeContext";
// import styles from "./LocalVideo.css";
// import { ChimeSdkWrapper } from "../providers/ChimeProvider";
import { useAudioVideo } from "../../providers/MeetingStatusProvider";

// const cx = classNames.bind(styles);

export default function LocalVideo() {
  const [enabled, setEnabled] = useState(false);
  const av = useAudioVideo();
  const videoElement = useRef(null);

  useEffect(() => {
    if (!av) {
      return;
    }
    av?.addObserver({
      videoTileDidUpdate: (tileState: VideoTileState): void => {
        if (
          !tileState.boundAttendeeId ||
          !tileState.localTile ||
          !tileState.tileId ||
          !videoElement.current
        ) {
          return;
        }
        console.log("videoTileDidUpdate");
        console.log(tileState);
        av?.bindVideoElement(
          tileState.tileId,
          (videoElement.current as unknown) as HTMLVideoElement
        );
        setEnabled(tileState.active);
      },
      videoTileWasRemoved: (tileId) => {
        console.log("Video Tile was removed");
        console.log(tileId);
      },
    });
  }, [av]);

  return <video muted ref={videoElement} height="100%" width="100%" />;
}
