import { css } from 'linaria';

const menu = css`
  position: relative;
  width: 20rem;
  padding: 1rem 0;
  border-radius: var(--radius-light);
  background-color: var(--bg-secondary);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
`;

const menuItem = css`
  width: 100%;
  padding: 0.6rem 1.1rem;
  border: none;
  text-align: left;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: transparent;
  transition: transform 500ms ease;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    background-color: var(--color-grey-20);
  }

  button& {
    cursor: pointer;
  }
`;

const menuItemGroup = css`
  padding-bottom: 0.5rem;
  margin: 0 0 1.1rem 0;
  border-bottom: 0.2rem solid var(--color-grey-20);

  &:last-of-type {
    padding-bottom: 0;
    margin-bottom: 0;
    border: none;
  }
`;

const groupHeader = css`
  padding: 0.5rem 1rem 0.2rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: var(--color-grey-70);
`;

const divider = css`
  margin: 0.8rem 0;
  height: 0.2rem;
  background-color: var(--color-grey-20);
`;

export default { menu, menuItem, menuItemGroup, groupHeader, divider };
