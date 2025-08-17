import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, CheckCircle } from 'lucide-react';

// FloatingLabelInput Component (since it's imported)
const FloatingLabelInput = ({ 
  type, 
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
  return (
    <div className="relative">
      <div className="relative">
        <input
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder=" "
          className={`
            peer w-full px-4 pt-6 pb-2 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        />
        <label className={`
          absolute left-4 top-4 text-gray-600 transition-all duration-200 pointer-events-none
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-black
          peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gray-600
        `}>
          {label}
        </label>
        {Icon && (
          <Icon className="absolute right-3 top-4 w-5 h-5 text-gray-600" />
        )}
        {type === 'password' && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-4 text-gray-600 hover:text-black"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

// Mock AuthUtils for demonstration
const AuthUtils = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  validatePassword: (password) => {
    const errors = [];
    let valid = true;
    
    if (password.length < 8) {
      errors.push('At least 8 characters');
      valid = false;
    } else {
      errors.push('At least 8 characters');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
      valid = false;
    } else {
      errors.push('One uppercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('One number');
      valid = false;
    } else {
      errors.push('One number');
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('One special character');
      valid = false;
    } else {
      errors.push('One special character');
    }
    
    return { valid: password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password), errors };
  }
};

// Mock useAuth hook
const useAuth = () => {
  const [loading, setLoading] = useState(false);
  
  const signUp = async (email, password, name) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Signing up:', { email, password, name });
    }, 2000);
  };
  
  return { signUp, loading };
};

// Signup Form Component
const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, loading } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!AuthUtils.validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = AuthUtils.validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      signUp(formData.email, formData.password, formData.name);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const passwordStrength = AuthUtils.validatePassword(formData.password);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-black mb-2">Create Account</h2>
        <p className="text-black/70">Sign up to get started</p>
      </div>
      
      <div className="space-y-6" onKeyPress={handleKeyPress}>
        <FloatingLabelInput
          type="text"
          label="Full name"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          icon={User}
          disabled={loading}
          autoFocus
        />
        
        <FloatingLabelInput
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          icon={Mail}
          disabled={loading}
        />
        
        <div>
          <FloatingLabelInput
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            icon={Lock}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            disabled={loading}
          />
          {formData.password && (
            <div className="mt-2 space-y-1">
              {passwordStrength.errors.map((error, index) => (
                <div key={index} className="flex items-center text-xs">
                  {passwordStrength.valid ? (
                    <CheckCircle className="w-3 h-3 mr-1 text-black" />
                  ) : (
                    <div className="w-3 h-3 mr-1 rounded-full border border-gray-400" />
                  )}
                  <span className={passwordStrength.valid ? 'text-gray-700' : 'text-gray-600'}>
                    {error}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <FloatingLabelInput
          type="password"
          label="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          icon={Lock}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={loading}
        />
        
        <div className="text-xs text-gray-600">
          By signing up, you agree to our{' '}
          <a href="#" className="text-black hover:text-gray-700 transition-colors underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-black hover:text-gray-700 transition-colors underline">Privacy Policy</a>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full h-12 bg-black hover:bg-gray-800 
            text-white font-semibold rounded-lg
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center
          "
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
        </button>
      </div>
    </div>
  );
};

export default SignupForm;