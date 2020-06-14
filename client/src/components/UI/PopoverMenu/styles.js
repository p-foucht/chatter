import { css } from 'linaria';

const button = css`
  display: inline-block
  border: none;
  padding: .6rem 1rem;
  border-radius: var(--radius-light);
  background: transparent;

  &:hover {
    cursor: pointer;
  }
`;

export default { button };
