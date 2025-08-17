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
    primary: "bg-black hover:bg-gray-800 text-white transform hover:scale-105 hover:shadow-lg",
    secondary: "border border-gray-400 hover:border-black text-gray-600 hover:text-black hover:bg-gray-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black",
    ghost: "text-gray-600 hover:text-black hover:bg-gray-100",
    gradient: "bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl",
    slate: "bg-gray-600 hover:bg-gray-700 border border-gray-500 text-white"
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