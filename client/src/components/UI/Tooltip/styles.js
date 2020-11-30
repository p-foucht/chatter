import { css } from 'linaria';

export const tooltip = css`
  animation: fade 175ms ease forwards;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1000000;

  @keyframes fade {
    0% {
      opacity: 0;
      transform: translateY(0.5rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default { tooltip };
