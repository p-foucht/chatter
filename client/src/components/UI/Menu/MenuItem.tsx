import React from 'react';

import styles from './styles';

export interface Props {
  onClick?: (e?) => void;
}

const MenuItem: React.FC<Props> = ({ onClick, children }) => {
  const El = onClick ? 'button' : 'div';
  return (
    <El className={styles.menuItem} onClick={onClick}>
      {children}
    </El>
  );
};

export default MenuItem;
