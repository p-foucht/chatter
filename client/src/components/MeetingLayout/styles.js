import { css } from 'linaria';

const wrapper = css`
  display: flex;
  height: 100%;
`;

const sidebar = css`
  flex-basis: 30%;
  max-width: 40rem;
`;

const meeting = css`
  position: relative;
  flex: 1;
`;

export default {
  wrapper,
  sidebar,
  meeting,
};
