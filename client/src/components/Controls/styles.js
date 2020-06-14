import { css } from 'linaria';

const controlBar = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.8rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
  border-radius: var(--radius-medium);
  z-index: 100;
`;

const controlButton = css`
  font-size: 2.5rem;
`;

export default {
  controlBar,
  controlButton,
};
