import { css } from 'linaria';

export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
`;

const list = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const item = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 1rem;
  border-bottom: 0.3rem solid #ccc;
  color: #bbb;
  cursor: pointer;
`;

const active = css`
  color: #0788ff;
  border-bottom: 0.3rem solid #0788ff;
`;

const icon = css`
  height: 3rem;
  width: 3rem;
  color: currentColor;
`;

export default {
  container,
  list,
  item,
  active,
  icon,
};
