import { useEffect, useState } from "react";

import { useChime } from "../../../providers/ChimeProvider";
import { useAudioVideo } from "../../../providers/MeetingStatusProvider";

const useLocalMute = () => {
  const chime = useChime();
  const audioVideo = useAudioVideo();

  const [isMuted, setIsMuted] = useState(true);
};
