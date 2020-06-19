import { css } from 'linaria';

export const roster = css`
  height: auto;
  min-height: 15rem;
  background-color: #fff;
  color: #434448;
  padding: 1rem;
  border-bottom: 1px solid #999;
  box-shadow: var(--shadow-heavy);
  resize: vertical;
  overflow-y: auto;
  position: relative;
`;

export const header = css`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-align: center;
`;

export const item = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.5rem 0;
`;

export const indicator = css`
  display: block;
  margin-left: 0.25rem;
  transform: translateY(-0.1rem);
`;

export const user = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export const profile = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 1rem;
  border-radius: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #0e79ce;
  color: #fff;
`;

export default {
  roster,
  header,
  item,
  indicator,
  profile,
  user,
};
