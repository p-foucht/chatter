import { css } from 'linaria';

export const title = css`
  margin-top: 1rem;
  font-size: 1.8rem;
  text-align: center;
  color: var(--color-grey-30);
`;

export const chat = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

// Chat message styles

export const message = css`
  margin-bottom: 1.5rem;
`;

export const row = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const author = css`
  font-size: 1.4rem;
  color: var(--color-info-light);

  &:first-letter {
    text-transform: uppercase;
  }
`;

export const timestamp = css`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-50);
`;

export const text = css`
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--color-grey-30);
`;

// Input and option styles

// Margin is a temporary fix to make border-top fill entire width
export const inputWrapper = css`
  font-size: 2.4rem;
  color: #444;
  z-index: 100;
`;
export const inputOptions = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 2rem;
  color: var(--color-grey-70);
`;

export const optionIcon = css`
  position: relative;
  margin-left: 1rem;
  cursor: pointer;
  transition: color 200ms ease;

  &:hover {
    color: var(--color-grey-40);
  }
`;

export const inputForm = css`
  padding: 1rem 2rem 2rem;
`;

export const inputBackground = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border: 0.2rem solid transparent;
  background-color: var(--color-grey-80);
  transition: border-color 250ms ease, background-color 250ms ease;

  &:hover {
    background-color: #37404c;
  }

  &:focus-within {
    color: var(--text-secondary);
    background-color: var(--color-grey-100);
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
  resize: none;
  font-family: inherit;
  padding: 1rem 1.5rem;
  min-height: 4rem;
  color: var(--text-primary);
  box-shadow: var(--shadow-light);

  &:active,
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--text-primary);
  }
`;

export const sendBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-right: 0.8rem;
  border: 0.1rem solid transparent;
  border-radius: 50%;
  background-color: var(--color-grey-90);
  cursor: pointer;
  transition: background-color 200ms ease;

  &:active {
    border: 0.1rem solid black;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  > svg {
    transform: translateX(0.1rem);
  }
`;

export const sendIcon = css`
  height: 1.5rem;
  width: 1.5rem;
  color: #fff;
`;

export const messageList = css`
  height: 100%;
  max-height: calc(100vh - 18.5rem);
  padding: 2rem;
  overflow-y: auto;
`;

export const continued = css`
  margin-top: -1rem;
`;

export const entranceContent = css`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 1.5;
  color: var(--color-grey-30);
`;

export const entranceText = css`
  display: block;
  margin: 0 1rem;
`;

export const entranceRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

export default {
  chat,
  title,
  message,
  row,
  author,
  timestamp,
  text,
  inputWrapper,
  inputForm,
  inputOptions,
  optionIcon,
  inputBackground,
  input,
  sendBtn,
  sendIcon,
  messageList,
  continued,
  entranceContent,
  entranceText,
  entranceRow,
};
