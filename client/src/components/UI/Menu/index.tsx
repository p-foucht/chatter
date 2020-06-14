import React from 'react';

import MenuItem, { Props as MenuItemProps } from './MenuItem';
import MenuItemGroup, { Props as MenuItemGroupProps } from './MenuItemGroup';
import MenuDivider, { Props as MenuDividerProps } from './MenuDivider';

import styles from './styles';

interface MenuComposition {
  Item: React.FC<MenuItemProps>;
  ItemGroup: React.FC<MenuItemGroupProps>;
  Divider: React.FC<MenuDividerProps>;
}

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Menu: React.FC<Props> & MenuComposition = ({ children }) => {
  return <div className={styles.menu}>{children}</div>;
};

Menu.Item = MenuItem;
Menu.ItemGroup = MenuItemGroup;
Menu.Divider = MenuDivider;

export default Menu;
