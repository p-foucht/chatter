import { css } from 'linaria';

const container = css`
  maxheight: calc(100vh - 5.6rem);
  overflow: hidden;
`;

const grid = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const row = css`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  background: #131315;
`;

const videoContainer = css`
  display: none;
  padding: 0.5rem;
  max-height: calc(100vh - 5.6rem);
`;

const video = css`
  position: relative;
  display: block;
  height: auto;
  width: 100%;
  max-height: calc(100vh - 5.6rem);
  border-radius: var(--radius-light);
  object-fit: cover;
`;

const active = css`
  display: block;
`;

export default { container, grid, row, video, active, videoContainer };
