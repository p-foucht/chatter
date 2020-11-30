import React from 'react';
import { Picker } from 'emoji-mart';
import OutsideClickHandler from 'react-outside-click-handler';

import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = (props: any) => (
  <OutsideClickHandler onOutsideClick={() => props.setPickerOpen(false)}>
    <Picker
      onSelect={props.onEmojiClick}
      set='apple'
      style={{ position: 'absolute', left: '-320px', top: '-425px' }}
    />
  </OutsideClickHandler>
);

export default EmojiPicker;
