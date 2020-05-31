import { css } from "linaria";

export const roster = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%;
  max-width: 25rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 2rem;
  box-shadow: var(--shadow-heavy);
`;

export const header = css`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export default { roster, header };
