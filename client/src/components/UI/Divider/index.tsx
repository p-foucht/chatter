import React from 'react';

import styles from './styles';

const Divider: React.FC = ({ children }) => {
  return <div className={styles.divider}>{children}</div>;
};

export default Divider;
