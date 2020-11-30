import { css } from 'linaria';

export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
  background-color: var(--color-grey-90);
  box-shadow: 0 6px 13px -6px rgba(0, 0, 0, 0.25);
`;

const list = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const item = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem 1rem 1.2rem;
  border-bottom: 0.3rem solid var(--color-grey-80);
  color: var(--color-grey-70);
  cursor: pointer;
  transition: background-color 190ms ease, border-color 190ms ease;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-40);
  }
`;

const active = css`
  color: var(--color-info-light);
  border-bottom: 0.3rem solid var(--color-info-light);
  background-color: var(--color-grey-100);

  &:hover {
    color: var(--color-info-med);
    border-bottom: 0.3rem solid var(--color-info-med);
  }
`;

const icon = css`
  height: 2.5rem;
  width: 2.5rem;
  margin-bottom: 0.5rem;
  // transition: color 100ms ease;
`;

export default {
  container,
  list,
  item,
  active,
  icon,
};
