import { css } from 'linaria';

const wrapper = css`
  display: flex;
  height: 100%;
  background: #131315;
`;

const sidebar = css`
  flex-basis: 30%;
  max-width: 40rem;
`;

const meeting = css`
  position: relative;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const meetingContent = css`
  position: relative;
  flex: 1;
`;

const controls = css`
  position: relative;
`;

const fullscreenIcon = css`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
`;

export default {
  wrapper,
  sidebar,
  meeting,
  meetingContent,
  controls,
  fullscreenIcon,
};
