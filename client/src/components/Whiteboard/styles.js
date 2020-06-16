import { css } from 'linaria';

const wrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
`;

const remoteWrapper = css`
  pointer-events: none;
`;

const localWrapper = css`
  cursor: crosshair;
`;

export default { wrapper, remoteWrapper, localWrapper };
