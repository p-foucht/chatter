import {
    css
} from "linaria";

const wrapper = css `
  height: 100%;
  background: #f5f6f7;
`;

const container = css `
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 600px;
  width: 100%;
  max-width: 1180px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 1px 2px 4px 4px #eee;
  background: #fff;
  overflow: hidden;
`;

const left = css `
  width: 50%;
  padding: 4rem 8rem 8rem 8rem;
`;

const right = css `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background: #3f51b5;
`;

export default {
    wrapper,
    container,
    left,
    right,
};