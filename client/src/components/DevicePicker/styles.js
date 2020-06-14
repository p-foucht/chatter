import { css } from 'linaria';

const menu = css`
  position: absolute;
  top: 50%;
  right: 50%;
  padding: 0.75rem;
  background: white;
  font-size: 1.6rem;
`;

const listTitle = css`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const listItem = css`
  margin-bottom: 0.25rem;

  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

export default { menu, listItem, listTitle };
