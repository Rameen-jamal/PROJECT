import React from 'react';

export const Input = ({ 
  label, 
  error, 
  helperText,
  className = '', 
  containerClassName = '',
  ...props 
}) => (
  <div className={containerClassName}>
    {label && (
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    <input
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
  </div>
);