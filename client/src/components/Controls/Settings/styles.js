import { css } from 'linaria';

const button = css`
  font-size: 2rem;
  color: var(--text-primary);
  line-height: unset;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const wrapper = css`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;

export default { button, wrapper };
