import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { DataMessage } from "amazon-chime-sdk-js";

import { useAudioVideo } from "../MeetingStatusProvider";

const StateContext = createContext<any>([]);
const MessageSetterContext = createContext<any>(() => {});

// Todo - Think of how we want to structure 'topic' based messages
// Such as chat messages, remote commands, PMs

const MessagingProvider = ({ children }) => {
  const av = useAudioVideo();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!av) {
      return;
    }

    const callback = (data: DataMessage) => {
      const message = JSON.parse(data.text());
      setMessages((currentMessages) => [...currentMessages, message]);
    };

    av.realtimeSubscribeToReceiveDataMessage("chat", callback);

    return () => av.realtimeUnsubscribeFromReceiveDataMessage("chat");
  }, [av]);

  return (
    <StateContext.Provider value={messages}>
      <MessageSetterContext.Provider value={setMessages}>
        {children}
      </MessageSetterContext.Provider>
    </StateContext.Provider>
  );
};

const useSendChatMessage = () => {
  const av = useAudioVideo();
  const setMessage = useContext(MessageSetterContext);

  const sendChatMessage = useCallback(
    (data: any) => {
      setMessage((messages) => [...messages, data]);
      av?.realtimeSendDataMessage("chat", JSON.stringify(data));
    },
    [av, setMessage]
  );

  return sendChatMessage;
};

const useChatMessages = () => {
  const messages = useContext(StateContext);

  return messages;
};

export { MessagingProvider, useSendChatMessage, useChatMessages };
