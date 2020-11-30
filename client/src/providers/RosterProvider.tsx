import React, { createContext, useEffect, useState, useContext } from 'react';
import { DefaultModality } from 'amazon-chime-sdk-js';

import { useAudioVideo } from './MeetingStatusProvider';
import { RosterType } from '../types/rosterType';
import { useAuth } from './AuthProvider';
import { useSendChatMessage } from './MessagingProvider';

const Context = createContext<RosterType>({});

const RosterProvider: React.FC = ({ children }) => {
  const audioVideo = useAudioVideo();
  const sendChatMessage = useSendChatMessage();
  const { username } = useAuth();
  const [roster, setRoster] = useState<RosterType>({});

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const callback = async (
      id: string,
      present: boolean,
      externalId?: string
    ) => {
      const name = externalId?.split('#')[1] || 'Anonomyous';

      if (!present) {
        console.log(`${name} dropped`);
        if (username === name) {
          sendChatMessage({
            text: `${name} has left the session`,
            entrance: true,
          });
        }

        setRoster((currentRoster: RosterType) => {
          const { [id]: omit, ...rest } = currentRoster;
          return { ...rest };
        });
        return;
      }

      const baseAttendeeId = new DefaultModality(id).base();
      if (baseAttendeeId !== id) {
        return;
      }

      setRoster((currentRoster: RosterType) => {
        if (currentRoster[id]) {
          return currentRoster;
        }

        // Temp way to send an entrance message
        if (username === name) {
          sendChatMessage({
            text: `${name} has joined the session`,
            entrance: true,
          });
        }

        console.log(`${name} has joined the session`);

        return {
          ...currentRoster,
          [id]: {
            name,
            id,
          },
        };
      });
    };

    audioVideo.realtimeSubscribeToAttendeeIdPresence(callback);

    return () => audioVideo.realtimeUnsubscribeToAttendeeIdPresence(callback);
  }, [audioVideo]);

  return <Context.Provider value={roster}>{children}</Context.Provider>;
};

const useRoster = (): RosterType => {
  const roster = useContext(Context);

  return roster;
};

export { RosterProvider, useRoster };
