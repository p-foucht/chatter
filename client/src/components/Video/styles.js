import { css } from 'linaria';

const grid = css`
  display: flex;
  flex-wrap: wrap;
`;

const video = css`
  position: relative;
  display: block;
  width: 40rem;
  height: auto;
  margin: 3rem;
  border-radius: var(--radius-light);
`;

export default { grid, video };
