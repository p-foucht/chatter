import React, { useRef, useLayoutEffect, useEffect } from 'react';
import classNames from 'classnames';

import CanvasManager from './CanvasManager';
import { useSocketApi } from '../../providers/SocketProvider';

import styles from './styles';

interface Props {
  canvasManager: CanvasManager;
}

const Whiteboard: React.FC<Props> = ({ canvasManager }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<any>(null);
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

      switch (type) {
        case 'draw':
          canvasManager.drawFullLine(payload);
          break;

        case 'undo':
          canvasManager.deleteLineById(payload);
          break;

        case 'redo':
          canvasManager.drawFullLine(payload);
          break;

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

  return (
    <canvas
      id="remote-canvas"
      ref={canvasEl}
      className={classNames(styles.wrapper, styles.remoteWrapper)}
    />
  );
};

export default Whiteboard;
