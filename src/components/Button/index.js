import React from 'react';

const Button = ({ type="button", name, onClick, children }) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      name={name} 
    >
      {children}
    </button>
  );
};

export default Button;