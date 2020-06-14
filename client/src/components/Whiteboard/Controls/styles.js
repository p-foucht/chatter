import { css } from 'linaria';

const wrapper = css`
  position: fixed;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  padding: 1.25rem;
  z-index: 500;

  > * {
    margin-bottom: 1rem;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

const item = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  border-radius: var(--radius-light);
  border: none;
  font-size: 1.5rem;
  background-color: var(--color-info-light);
  color: var(--color-grey-10);
  transition: background-color 220ms ease;

  &:hover {
    background-color: var(--color-info-med);
  }
`;

const color = css`
  width: 0.5rem;
  height: 0.5rem;
`;

export default { wrapper, item, color };
