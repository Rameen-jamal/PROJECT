import React from 'react';

export const Card = ({ children, className = '', onClick, hover = true }) => (
  <div
    className={`bg-white rounded-xl shadow-md ${hover ? 'hover:shadow-lg' : ''} transition-shadow ${className} ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {children}
  </div>
);