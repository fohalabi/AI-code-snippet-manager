import React from 'react';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  gradient = false,
  popular = false,
  ...props 
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    // For interface mockups and code displays
    interface: "bg-white/90 backdrop-blur-xl border border-gray-200 p-6 shadow-lg",
    
    // For feature cards
    feature: `bg-white/90 backdrop-blur-lg border border-gray-200 p-8 shadow-xl group
              ${hover ? 'hover:shadow-2xl hover:shadow-gray-500/25 hover:-translate-y-2 hover:bg-white' : ''}`,
    
    // For pricing cards
    pricing: `bg-white/90 backdrop-blur-sm border p-8 ${popular ? 'border-black shadow-2xl shadow-gray-500/20' : 'border-gray-200'} 
              ${hover ? 'hover:transform hover:scale-105' : ''}`,
    
    // For testimonial cards
    testimonial: `bg-white border border-gray-200 p-8 shadow-lg group
                  ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}`,
    
    // For stats cards
    stats: "bg-white p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl",
    
    // For company logo cards
    company: "bg-gray-50 to-white p-6 shadow-md border border-gray-200 group hover:shadow-lg hover:bg-white",
    
    // For CTA cards
    cta: "bg-gray-50 backdrop-blur-sm border border-gray-200 p-8",
    
    // For code snippet cards
    code: "bg-white border p-4 transition-all duration-500",
    
    // For AI suggestions - updated for black and white theme
    suggestion: "bg-gray-50 border border-gray-300 p-4",
    
    // Default glass card
    default: "bg-white/90 backdrop-blur-sm border border-gray-200 p-6 shadow-lg"
  };

  const cardClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={cardClasses} {...props}>
      {/* Gradient border effect for feature cards */}
      {variant === 'feature' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-600 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" 
             style={{ padding: '2px' }}>
          <div className="w-full h-full bg-white rounded-2xl"></div>
        </div>
      )}
      
      {/* Top accent line for feature cards */}
      {variant === 'feature' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600 to-black 
                        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
        </div>
      )}

      {/* Popular badge for pricing cards */}
      {popular && variant === 'pricing' && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Floating elements for feature cards */}
      {variant === 'feature' && (
        <>
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-gray-400/20 
                          rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gray-600/20 
                          rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </>
      )}

      {children}
    </div>
  );
};

export default Card;