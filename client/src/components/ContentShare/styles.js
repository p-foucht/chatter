import { css } from 'linaria';

const wrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: calc(100vh - 12.5rem - 5.6rem);

  video {
    max-width: 100%;
    max-height: calc(100vh - 12.5em - 5.6rem);
  }
`;

export default { wrapper };
