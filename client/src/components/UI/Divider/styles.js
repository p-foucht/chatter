import { css } from 'linaria';

const divider = css`
  display: flex;
  align-items: center;
  text-align: center;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 0.1rem solid var(--color-grey-20);
    border-bottom: 0.1rem solid var(--color-grey-20);
  }

  &::before {
    margin-right: 0.8rem;
  }

  &::after {
    margin-left: 0.8rem;
  }
`;

export default {
  divider,
};
