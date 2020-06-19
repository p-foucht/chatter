import React from 'react';
import classNames from 'classnames';

import styles from './styles';

type Props = {
  index: number;
  classes: any;
  active: boolean;
  onDoubleClick: any;
  id: any;
  isFullscreen?: boolean;
  mini?: boolean;
};

const VideoTile = React.forwardRef((props: Props, ref: any) => (
  <div
    onDoubleClick={props.onDoubleClick}
    className={classNames(styles.videoContainer, {
      [styles.active]: props.active,
      [styles.mini]: props.mini,
      [styles.border]: props.isFullscreen,
    })}
  >
    <video key={props.index} className={styles.video} muted ref={ref} />
  </div>
));

export default VideoTile;
