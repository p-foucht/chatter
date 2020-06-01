import {
    css
} from "linaria";

export const controlBar = css `
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  min-height: 50px;
  min-width: 70%;
  max-width: calc(100% - 25em);
  width: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: 1rem;
  box-shadow: var(--shadow-heavy);
`;

export default {
    controlBar,
};