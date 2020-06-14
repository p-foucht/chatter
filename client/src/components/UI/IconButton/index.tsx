import React, { ReactNode } from 'react';
import classNames from 'classnames';

import styles from './styles';

type Variant = 'primary' | 'secondary';

type Shape = 'circle' | 'square';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: Variant;
  shape?: Shape;
  icon: ReactNode;
  label: string;
}

const Button: React.FC<Props> = ({
  className,
  shape,
  icon: Icon,
  label,
  children,
  ...rest
}) => {
  const classes = classNames(styles.button, styles[shape], className);

  return (
    <button className={classes} {...rest} aria-label={label}>
      <span className={styles.icon}>{Icon}</span>
    </button>
  );
};

export default Button;
