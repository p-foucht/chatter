import React, { HTMLAttributes } from 'react';
import { css } from 'linaria';

const buttonStyles = css`
  height: 100%;
  width: 100%;
  color: inherit;
  background: inherit;
  border: none;
`;

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ControlButton: React.FC<Props> = ({ icon, onClick, label, ...rest }) => {
  return (
    <button
      className={buttonStyles}
      aria-label={label}
      onClick={onClick}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default ControlButton;
