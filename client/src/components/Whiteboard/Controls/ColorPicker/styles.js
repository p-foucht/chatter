import { css } from 'linaria';

const wrapper = css`
  position: relative;
`;

const colorPopup = css`
  position: absolute;
  left: 120%;

  > * {
    font-family: 'Baloo 2', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue' !important;
  }
`;

export default { wrapper, colorPopup };
