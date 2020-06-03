import { css } from "linaria";

const wrapper = css`
  display: flex;

  > * {
    margin: 0 0.5rem;
  }

  > :first-child {
    margin-left: 0;
  }

  > :last-child {
    margin-right: 0;
  }
`;

const stacked = css`
  flex-direction: column;

  > * {
    margin: 0.5rem 0;
  }

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

export default { wrapper, stacked };
