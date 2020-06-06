import {
    css
} from 'linaria';

export const container = css `
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  color: var(--text-primary);
  box-shadow: var(--shadow-heavy);
`;

const list = css `
    display: flex;
    justify-content: center;
    align-items: center;
`

const item = css `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 1rem;
    border-bottom: 0.2rem solid #ccc;
    color: #777;
    cursor: pointer;
`

const active = css `
    color: #0788FF;
    border-bottom: 0.2rem solid #0788FF;
`

const icon = css `
    height: 2.5rem;
    width: 2.5rem;
    color: currentColor;
`

export default {
    container,
    list,
    item,
    active,
    icon,
};