import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

// Floating Label Input Component
const FloatingLabelInput = ({ 
  type = 'text', 
  label, 
  value, 
  onChange, 
  error, 
  icon: Icon,
  showPassword,
  onTogglePassword,
  disabled,
  autoFocus
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = focused || hasValue;

  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
        )}
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`
            w-full h-12 px-4 ${Icon ? 'pl-12' : 'pl-4'} pr-12 
            bg-white border rounded-lg
            text-black placeholder-transparent
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
          `}
          placeholder={label}
        />
        <label
          className={`
            absolute left-4 ${Icon ? 'left-12' : 'left-4'} transition-all duration-300 ease-out
            pointer-events-none
            ${isFloating 
              ? 'top-2 text-xs text-gray-600' 
              : 'top-1/2 transform -translate-y-1/2 text-sm text-gray-500'
            }
          `}
        >
          {label}
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;