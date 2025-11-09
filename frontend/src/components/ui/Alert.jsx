import React from 'react';

export const Alert = ({ type = 'info', children, onClose, className = '' }) => {
  const types = {
    error: 'bg-red-100 text-red-700 border-red-400',
    success: 'bg-green-100 text-green-700 border-green-400',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-400',
    info: 'bg-blue-100 text-blue-700 border-blue-400',
  };

  return (
    <div className={`px-4 py-3 rounded border ${types[type]} flex justify-between items-center ${className}`}>
      <span>{children}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold hover:opacity-75">
          ×
        </button>
      )}
    </div>
  );
};