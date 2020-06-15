import { css } from 'linaria';

const grid = css`
  display: flex;
  flex-wrap: wrap;
`;

const video = css`
  position: relative;
  display: none;
  height: auto;
  padding: 3rem;
  border-radius: var(--radius-light);
`;

const active = css`
  display: block;
`;

export default { grid, video, active };
