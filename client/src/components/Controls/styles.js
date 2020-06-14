import { css } from 'linaria';

export const controlBar = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.5rem 2rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
  border-radius: var(--radius-medium);
  z-index: 100;
`;

export default {
  controlBar,
};
