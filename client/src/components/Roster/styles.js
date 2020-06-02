import { css } from 'linaria';

export const roster = css`
  height: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem;
  box-shadow: var(--shadow-heavy);
`;

export const header = css`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const item = css`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.5rem 0;
`;

export const indicator = css`
  display: block;
  margin-left: 0.25rem;
  transform: translateY(-0.1rem);
`;

export default {
  roster,
  header,
  item,
  indicator,
};
