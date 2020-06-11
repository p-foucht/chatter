import React, {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { BASE_WS_URL } from '../constants/URLs';

interface SocketListener {
  (data: any): void;
}

interface SocketApi {
  subscribe: (cb: SocketListener) => void;
  unsubscribe: (cb: SocketListener) => void;
  sendMessage: SocketListener;
}

const Context = createContext<SocketApi | null>(null);

const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const listeners = useRef<SocketListener[]>([]);

  const api = useMemo(
    () => ({
      subscribe: (cb: SocketListener) => {
        listeners.current.push(cb);
      },
      unsubscribe: (cb: SocketListener) => {
        const index = listeners.current.indexOf(cb);
        if (index > -1) {
          listeners.current.splice(index, 1);
          console.log(listeners.current);
        }
      },
      sendMessage: (data: any) => {
        if (!socket) {
          console.log('Socket has not been initialized');
          return;
        }
        socket.send(JSON.stringify(data));
      },
    }),
    [socket]
  );

  useEffect(() => {
    console.log('useEffect: Setting up WS');

    const ws = new WebSocket(BASE_WS_URL);

    ws.onopen = () => {
      console.log('SocketProvider::connection opened');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('SocketProvider::connection closed');
    };

    ws.onmessage = (e) => {
      console.log('SocketProvider::incoming message');

      const data = JSON.parse(e.data);
      listeners.current.forEach((cb) => {
        cb(data);
      });
    };
  }, []);

  return <Context.Provider value={api}>{children}</Context.Provider>;
};

const useSocketApi = (): SocketApi => {
  const api = useContext(Context);

  if (!api) {
    throw new Error('useSocketApi must be used within a SocketProvider');
  }

  return api;
};

export { SocketProvider, useSocketApi };
