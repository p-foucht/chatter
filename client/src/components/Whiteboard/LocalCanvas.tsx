import React, { useRef, useLayoutEffect, useEffect } from 'react';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';

import CanvasManager from './CanvasManager';
import { useSocketApi } from '../../providers/SocketProvider';
import { useWhiteboardState } from '../../hooks/whiteboard';

import styles from './styles';

interface Props {
  canvasManager: CanvasManager;
}

const Whiteboard: React.FC<Props> = ({ canvasManager }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const ctx = useRef<any>(null);
  const socketApi = useSocketApi();
  const [{ strokeColor }] = useWhiteboardState();

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
    return () => {
      canvasManager.initializeState();
      window.removeEventListener('resize', initCanvas);
    };
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
    const cb = (message) => {
      const { type } = message;

      switch (type) {
        case 'clear':
          canvasManager.clearCanvas();
          break;

        default:
          break;
      }
    };
    socketApi.subscribe(cb);

    return () => socketApi.unsubscribe(cb);
  }, [canvasManager, socketApi]);

  useEffect(() => {
    const endDraw = () => {
      const line = canvasManager.stopLine();
      isDrawing.current = false;

      if (line) {
        socketApi.sendMessage({
          action: 'whiteboard',
          type: 'draw',
          payload: line,
        });
      }
    };

    document.addEventListener('mouseup', endDraw, false);

    return () => document.removeEventListener('mouseup', endDraw, false);
  }, [canvasManager, socketApi]);

  useEffect(() => {
    canvasManager.setStrokeColor(strokeColor);
  }, [strokeColor, canvasManager]);

  return (
    <canvas
      ref={canvasEl}
      className={classNames(styles.wrapper, styles.localWrapper)}
    />
  );
};

export default Whiteboard;
