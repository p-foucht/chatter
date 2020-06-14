import React, { ReactNode } from 'react';

import styles from './styles';

export interface Props {
  title?: string;
  icon?: ReactNode;
}

const MenuItemGroup: React.FC<Props> = ({ title, icon, children }) => {
  return (
    <div className={styles.menuItemGroup}>
      {title && (
        <h3 className={styles.groupHeader}>
          {icon || null}
          {title}
        </h3>
      )}

      {children}
    </div>
  );
};

export default MenuItemGroup;
