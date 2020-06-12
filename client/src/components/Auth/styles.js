import { css } from "linaria";

const color = "#3f51b5";

const header = css`
  font-family: arial;
  margin-bottom: 2rem;
  font-size: 3.2rem;
  font-weight: 900;
  color: #374049;
`;

const subheader = css`
    display: block
    margin-bottom: 4rem;
    font-size: 1.6rem;
    color: #999;
`;

const checkboxRow = css`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
`;

const checkbox = css`
  margin-right: 1.5rem;
  margin-bottom: 0.5rem;
`;

const checkboxLabel = css`
  display: block;
  font-size: 1.4rem;
  line-height: 1.25;
  color: #999;
`;

const btn = css`
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: none;
  border-radius: 3px;
  background: ${color};
  color: #fff;
  cursor: pointer;
`;

const terms = css`
  color: ${color};
  text-decoration: underline;
  cursor: pointer;
`;

const switchText = css`
  font-size: 1.4rem;
  text-align: center;
  color: #999;
`;

const primaryColor = css`
  font-weight: bold;
  text-decoration: none;
  color: ${color};
  cursor: pointer;
`;

// CAROUSEL STYLES

const title = css`
  margin-bottom: 2rem;
  font-size: 1.6rem;
  text-align: center;
  color: #fff;
`;
const p = css`
  width: 350px;
  margin: auto;
  margin-bottom: 4rem;
  font-size: 1.6rem;
  line-height: 1.25;
  text-align: center;
  color: #eee;
`;

const svg = css`
  display: block;
  max-height: 300px;
  margin: auto;
  margin-bottom: 5rem;
`;

const dotContainer = css`
  display: flex;
  justify-content: center;
`;

const dot = css`
  margin: 0 0.25rem;
  padding: 0.3rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);

  &:disabled {
    background: #fff;
  }
`;

export default {
  header,
  subheader,
  checkboxRow,
  checkbox,
  checkboxLabel,
  btn,
  terms,
  switchText,
  primaryColor,
  title,
  p,
  svg,
  dot,
  dotContainer,
};
