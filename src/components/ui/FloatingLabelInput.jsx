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
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
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
            bg-white/5 backdrop-blur-sm border rounded-lg
            text-white placeholder-transparent
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-white/20 hover:border-white/30'}
          `}
          placeholder={label}
        />
        <label
          className={`
            absolute left-4 ${Icon ? 'left-12' : 'left-4'} transition-all duration-300 ease-out
            pointer-events-none text-gray-400
            ${isFloating 
              ? 'top-2 text-xs text-purple-400' 
              : 'top-1/2 transform -translate-y-1/2 text-sm'
            }
          `}
        >
          {label}
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;