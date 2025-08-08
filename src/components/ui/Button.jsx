import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = "font-semibold transition-all duration-300 flex items-center justify-center gap-3 group";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25",
    secondary: "border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white hover:bg-purple-500/10",
    outline: "border border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-slate-300 hover:text-white hover:bg-white/10",
    gradient: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl",
    slate: "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 border border-slate-500 text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg", 
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-8 py-4 text-lg rounded-xl"
  };

  const widthClass = fullWidth ? "w-full" : "";
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${widthClass}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={variant === 'secondary' ? '' : 'group-hover:translate-x-1 transition-transform'}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={variant === 'secondary' ? '' : 'group-hover:translate-x-1 transition-transform'}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;