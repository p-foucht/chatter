import { css } from 'linaria';

const button = css`
  position: relative;
  margin: 0 0.25rem;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  border: none;
  background: none;
  z-index: 1;

  &:hover::before {
    transform: scale(1.075);
  }

  &:focus,
  &:active {
    outline: none;
  }

  &:focus::before {
    box-shadow: 0 0 0 2pt var(--color-info-light);
  }
`;

const square = css`
  margin: 0 0.25rem;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  border: 0.2rem solid var(--bg-secondary);
  background: none;
  border-radius: var(--radius-light);
`;

const circle = css`
  position: relative;
  margin: 0 0.25rem;
  height: 4rem;
  width: 4rem;
  font-size: 2rem;
  border-radius: 100%;
  border: none;
  background: none;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    background-color: var(--color-grey-10);
    z-index: -1;
    pointer-events: none;
    transform: scale(1);
    transition: transform 200ms ease;
    will-change: transform;
  }
`;

const icon = css`
  position: relative;
  top: 0.2rem;
  color: var(--bg-secondary);
`;

export default {
  button,
  icon,
  square,
  circle,
};
