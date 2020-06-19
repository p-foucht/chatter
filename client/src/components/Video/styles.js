import { css } from 'linaria';

const container = css`
  height: auto;
  max-height: calc(100vh - 5.6rem);
  overflow: hidden;
`;

const grid = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
`;

const row = css`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  background: #131315;
  overflow-x: auto;
`;

const videoContainer = css`
  display: none;
  border: 1px solid transparent;
  border-radius: 3px;
  overflow: hidden;
`;

const border = css`
  border: 1px solid #4caf50;
`;

const mini = css`
  width: 20rem !important;
`;

const video = css`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  max-height: calc(100vh - 5.6rem);
  border-radius: var(--radius-light);
  object-fit: cover;
`;

const active = css`
  display: block;
`;

// ASPECT RATIO GRID

const grid1 = css`
  display: grid;
  padding-top: 62.5%;
  width: 100%;
  height: 0;
`;

const fill = css`
  height: 100%;
`;

export default {
  grid1,
  container,
  grid,
  row,
  video,
  active,
  videoContainer,
  fill,
  border,
  mini,
};
