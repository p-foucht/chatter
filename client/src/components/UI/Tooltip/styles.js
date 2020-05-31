import { css } from "linaria";

export const tooltip = css`
  padding-bottom: 0.3rem;
  animation: fade 175ms ease forwards;
  font-size: 0.9rem;
  font-weight: 600;

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
