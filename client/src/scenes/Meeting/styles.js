import { css } from 'linaria';

const wrapper = css`
  display: flex;
  height: 100%;
`;

const roster = css`
  flex-basis: 30%;
  max-width: 30rem;
`;

const meeting = css`
  position: relative;
  flex: 1;
`;

export default { wrapper, roster, meeting };
