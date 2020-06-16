import React from 'react';
import classNames from 'classnames';
import styles from './styles';

type Props = {
  index: number;
  width: string;
  classes: any;
  active: boolean;
};

const VideoTile = React.forwardRef((props: Props, ref: any) => (
  <div
    style={{ width: props.width }}
    className={classNames(styles.videoContainer, {
      [styles.active]: props.active,
    })}
  >
    <video
      key={props.index}
      style={{ width: '100%' }}
      className={styles.video}
      muted
      ref={ref}
    />
  </div>
));

export default VideoTile;
