import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, CheckCircle } from 'lucide-react';
import FloatingLabelInput from '../ui/FloatingLabelInput';
import AuthUtils from '../../utils/auth';
import { useAuth } from '../../contexts/AuthContext';

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
                  <CheckCircle className="w-3 h-3 mr-1 text-green-400" />
                ) : (
                  <div className="w-3 h-3 mr-1 rounded-full border border-gray-400" />
                )}
                <span className={passwordStrength.valid ? 'text-green-400' : 'text-gray-400'}>
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
      
      <div className="text-xs text-gray-400">
        By signing up, you agree to our{' '}
        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
      </div>
      
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 
          hover:from-purple-700 hover:to-pink-700 
          text-white font-semibold rounded-lg
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center
        "
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
      </button>
    </div>
  );
};

export default SignupForm;