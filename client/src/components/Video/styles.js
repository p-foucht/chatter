import { css } from 'linaria';

const grid = css`
  display: flex;
  flex-wrap: wrap;
`;

const videoContainer = css`
  display: none;
  padding: 1rem;
`;

const video = css`
  position: relative;
  display: block;
  height: auto;
  max-height: calc(100vh - 51px);
  border-radius: var(--radius-light);
`;

const active = css`
  display: block;
`;

export default { grid, video, active, videoContainer };
