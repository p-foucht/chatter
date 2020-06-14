import { css } from "linaria";

const wrapper = css`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  transform: translate(-50%, -50%);
`;

const box = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  padding: 30px;
  background: #5e7bea;
  cursor: pointer;
`;

const icon = css`
  height: 4rem;
  width: 4rem;
  color: #fff;
`;

export default {
  wrapper,
  box,
  icon,
};
