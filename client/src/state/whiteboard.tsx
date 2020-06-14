import { atom } from 'recoil';

const whiteboardState = atom({
  key: 'whiteboardState',
  default: {
    isActive: false,
    strokeColor: 'black',
    bgColor: 'transparent',
  },
});

export { whiteboardState };
