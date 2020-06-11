import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import CanvasManager from './CanvasManager';
import { useSocketApi } from '../../providers/SocketProvider';

import styles from './styles';

const Whiteboard = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
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
    const startDraw = (e) => {
      if (!canvasEl.current) {
        return;
      }

      const x = e.offsetX || e.layerX - canvasEl.current.offsetLeft;
      const y = e.offsetY || e.layerY - canvasEl.current.offsetLeft;

      canvasManager.startLine(x, y, uuid());
      isDrawing.current = true;
    };

    const draw = (e) => {
      if (!isDrawing.current || !canvasEl.current || !ctx.current) {
        return;
      }

      const x = e.offsetX || e.layerX - canvasEl.current.offsetLeft;
      const y = e.offsetY || e.layerY - canvasEl.current.offsetLeft;

      canvasManager.sketchLine(x, y);
    };

    canvasEl?.current?.addEventListener('mousedown', startDraw, false);
    canvasEl?.current?.addEventListener('mousemove', draw, false);

    return () => {
      canvasEl?.current?.removeEventListener('mousemove', draw, false);
      canvasEl?.current?.removeEventListener('mousedown', startDraw, false);
    };
  }, [canvasManager]);

  useEffect(() => {
    const endDraw = () => {
      const line = canvasManager.stopLine();
      isDrawing.current = false;
      socketApi.sendMessage({
        action: 'whiteboard',
        type: 'draw',
        payload: line,
      });
    };

    document.addEventListener('mouseup', endDraw, false);

    return () => document.removeEventListener('mouseup', endDraw, false);
  }, [canvasManager, socketApi]);

  return <canvas ref={canvasEl} className={styles.wrapper} />;
};

export default Whiteboard;
