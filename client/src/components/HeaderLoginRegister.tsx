import React from 'react';
import '../styles/HeaderLoginRegister.css';

export interface Props {
  title: string;
  subtitle: string;
  local: string;
}

export const HeaderLoginRegister: React.FC<Props> = ({
  title,
  subtitle,
  local,
}) => {
  return (
    <>
      {local === 'login' ? (
        <div className="fon">
          <div className="title">{title}</div>
          <div className="subtitle color">{subtitle}</div>
        </div>
      ) : (
        <div className="fon">
          <div className="subtitle">{subtitle}</div>
          <div className="title color">{title}</div>
        </div>
      )}
    </>
  );
};

export default HeaderLoginRegister;
