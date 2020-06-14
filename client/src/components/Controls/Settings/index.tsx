import React from 'react';
import { IoMdSettings } from 'react-icons/io';

import PopoverMenu from '../../UI/PopoverMenu';
import DevicePicker from '../../DevicePicker';

import styles from './styles';

const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <PopoverMenu
        menu={<DevicePicker />}
        trigger={
          <div className={styles.button}>
            <IoMdSettings />
          </div>
        }
      />
    </div>
  );
};

export default Settings;
