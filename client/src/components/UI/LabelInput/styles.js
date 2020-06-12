import { css } from 'linaria';

const color = '#3f51b5';

const input = css`
  display: block;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #dcdcdc;
  border-radius: 6px;

  &::placeholder {
    color: #bbb;
  }

  &:active,
  &:focus {
    border: 1px solid ${color};
    outline: none;
  }
`;
const label = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #848484;
`;

const error = css`
  font-size: 1.2rem;
  color: red;
`;

export default {
  input,
  label,
  error,
};
