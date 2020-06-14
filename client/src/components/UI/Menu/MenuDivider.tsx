import React from 'react';

import styles from './styles';

export interface Props {}

const MenuItemGroup: React.FC<Props> = () => {
  return <div className={styles.divider} />;
};

export default MenuItemGroup;
