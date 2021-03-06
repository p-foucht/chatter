import { css } from 'linaria';

export const chat = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem;
`;

// Chat message styles

export const message = css`
  margin-bottom: 1.5rem;
`;

export const row = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const author = css`
  font-size: 1.4rem;
  color: #0788ff;
`;

export const timestamp = css`
  font-size: 12px;
  color: #999;
`;

export const text = css`
  font-size: 1.4rem;
  line-height: 1.5;
  color: #434448;
`;

// Input and option styles

// Margin is a temporary fix to make border-top fill entire width
export const inputWrapper = css`
  margin: 0 -2rem;
  padding: 1rem 2rem 0 2rem;
  border-top: 0.2rem solid var(--color-grey-50);
  font-size: 2.4rem;
  color: #444;
  z-index: 100;
`;
export const inputOptions = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

export const optionIcon = css`
  margin-left: 1rem;
  cursor: pointer;
`;

export const inputBackground = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--color-grey-50);
  transition: border-color 250ms ease, background-color 250ms ease;

  &:focus-within {
    color: var(--text-secondary);
    border: 0.2rem solid var(--color-info-light);

    button {
      background-color: var(--color-info-light);
    }
  }
`;

export const input = css`
  width: 100%;
  border: none;
  font-size: 1.4rem;
  background: transparent;

  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`;

export const sendBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 0.1rem solid transparent;
  border-radius: 50%;
  background-color: var(--color-grey-50);
  cursor: pointer;
  transition: background-color 200ms ease;

  &:active {
    border: 0.1rem solid black;
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

export const sendIcon = css`
  height: 1.5rem;
  width: 1.5rem;
  color: #fff;
`;

export default {
  chat,
  message,
  row,
  author,
  timestamp,
  text,
  inputWrapper,
  inputOptions,
  optionIcon,
  inputBackground,
  input,
  sendBtn,
  sendIcon,
};
