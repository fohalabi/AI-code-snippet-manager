import React from 'react';

const Section = ({ 
  children, 
  id,
  className = '',
  background = 'gradient',
  padding = 'default',
  minHeight = false,
  container = true,
  containerSize = 'default',
  ...props 
}) => {
  const backgrounds = {
    gradient: "bg-gradient-to-br from-gray-50 to-white",
    solid: "bg-white",
    transparent: "",
    custom: ""
  };

  const paddings = {
    none: "",
    sm: "py-10",
    default: "py-20",
    lg: "py-24",
    xl: "py-32"
  };

  const containerSizes = {
    sm: "max-w-4xl mx-auto",
    default: "max-w-6xl mx-auto", 
    lg: "max-w-7xl mx-auto",
    full: "w-full"
  };

  const sectionClasses = `
    ${backgrounds[background]}
    ${paddings[padding]}
    ${minHeight ? 'min-h-screen' : ''}
    relative overflow-hidden
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const containerClasses = container 
    ? `${containerSizes[containerSize]} px-4 sm:px-6 lg:px-8`
    : '';

  return (
    <section id={id} className={sectionClasses} {...props}>
      {/* Animated Background Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridMove 30s linear infinite'
        }}
      ></div>

      {/* Animated Background Elements for Hero-style sections */}
      {background === 'gradient' && minHeight && (
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-gray-400/5 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-500/5 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Grid Pattern Overlay */}
      <div className='absolute inset-0 bg-grid-black/[0.02] bg-grid-16'></div>

      {/* Content Container */}
      <div className={`relative z-10 ${containerClasses}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;