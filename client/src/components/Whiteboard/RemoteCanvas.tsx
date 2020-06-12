import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

import CanvasManager from './CanvasManager';
import { useSocketApi } from '../../providers/SocketProvider';

import styles from './styles';

const Whiteboard = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<any>(null);
  const [canvasManager] = useState(() => new CanvasManager());
  const socketApi = useSocketApi();

  useLayoutEffect(() => {
    const initCanvas = () => {
      if (canvasEl.current) {
        ctx.current = canvasEl.current.getContext('2d')!;
      }

      const height = canvasEl.current?.parentElement?.offsetHeight!;
      const width = canvasEl.current?.parentElement?.offsetWidth!;

      canvasEl?.current?.setAttribute('height', height.toString());
      canvasEl?.current?.setAttribute('width', width.toString());

      const canvasCtx = canvasEl?.current?.getContext('2d')!;
      canvasManager.init(canvasCtx, height, width);
      canvasManager.drawCurrentState();
    };

    initCanvas();

    window.addEventListener('resize', initCanvas, false);
    return () => window.removeEventListener('resize', initCanvas);
  }, [canvasManager]);

  useEffect(() => {
    const cb = (message) => {
      const { type, payload } = message;
      if (type === 'draw') {
        canvasManager.drawFullLine(payload);
      }
    };
    socketApi.subscribe(cb);

    return () => socketApi.unsubscribe(cb);
  }, [canvasManager, socketApi]);

  return (
    <canvas id="remote-canvas" ref={canvasEl} className={styles.wrapper} />
  );
};

export default Whiteboard;