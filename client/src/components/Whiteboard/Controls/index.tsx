import React from 'react';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import { IoMdTrash } from 'react-icons/io';

import ColorPicker from './ColorPicker';
import Portal from '../../Portal';
import CanvasManager from '../CanvasManager';
import { useSocketApi } from '../../../providers/SocketProvider';
import ControlButton from './ControlButton';

import styles from './styles';

interface Props {
  managers: {
    local: CanvasManager;
    remote: CanvasManager;
  };
}

const Controls: React.FC<Props> = ({ managers }) => {
  const socketApi = useSocketApi();
  const { local, remote } = managers;

  const undo = () => {
    const line = local.undo();

    if (!line) {
      return;
    }

    socketApi.sendMessage({
      action: 'whiteboard',
      type: 'undo',
      payload: line.id,
    });
  };

  const redo = () => {
    const line = local.redo();

    if (!line) {
      return;
    }

    socketApi.sendMessage({
      action: 'whiteboard',
      type: 'redo',
      payload: line,
    });
  };

  const clearCanvas = () => {
    local.clearCanvas();
    remote.clearCanvas();

    socketApi.sendMessage({
      action: 'whiteboard',
      type: 'clear',
    });
  };

  return (
    <Portal root="whiteboard-root">
      <div className={styles.wrapper}>
        <ColorPicker className={styles.item} />
        <ControlButton
          onClick={undo}
          className={styles.item}
          label="Undo last line"
          icon={<IoIosUndo />}
        />
        <ControlButton
          onClick={redo}
          className={styles.item}
          label="Redo last line"
          icon={<IoIosRedo />}
        />
        <ControlButton
          onClick={clearCanvas}
          className={styles.item}
          label="Clear whiteboard"
          icon={<IoMdTrash />}
        />
      </div>
    </Portal>
  );
};

export default Controls;
