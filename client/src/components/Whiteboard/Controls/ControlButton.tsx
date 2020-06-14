import React, { HTMLAttributes, ReactNode } from 'react';
import { css } from 'linaria';
import Tooltip from '../../UI/Tooltip';

const buttonStyles = css`
  height: 100%;
  width: 100%;
  color: inherit;
  background: inherit;
  border: none;
`;

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

const ControlButton: React.FC<Props> = ({ icon, onClick, label, ...rest }) => {
  return (
    <Tooltip tooltip={label} position="right">
      <button
        className={buttonStyles}
        aria-label={label}
        onClick={onClick}
        {...rest}
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default ControlButton;
