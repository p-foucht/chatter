import { css } from 'linaria';

export const controlBar = css`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  padding: 1rem 1.25rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
  border-radius: var(--radius-medium);
`;

export default {
  controlBar,
};
