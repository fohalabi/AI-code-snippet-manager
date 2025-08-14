import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import FloatingLabelInput from '../ui/FloatingLabelInput'
import AuthUtils from '../../utils/auth';
import  { useAuth } from '../../hooks/useAuth';

// Login Form Component
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loading } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!AuthUtils.validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      signIn(formData.email, formData.password);
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

  return (
    <div className="space-y-6" onKeyPress={handleKeyPress}>
      <FloatingLabelInput
        type="email"
        label="Email address"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        icon={Mail}
        disabled={loading}
        autoFocus
      />
      
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
      
      <div className="flex items-center justify-between">
        <label className="flex items-center text-sm text-gray-400">
          <input
            type="checkbox"
            className="mr-2 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
          />
          Remember me
        </label>
        <button
          type="button"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Forgot password?
        </button>
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
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
      </button>
      
      <p className="text-center text-sm text-gray-400">
        Demo: Use{' '}
        <code className="text-purple-400 bg-white/10 px-1 rounded">demo@example.com</code>
        {' '}with password{' '}
        <code className="text-purple-400 bg-white/10 px-1 rounded">password123</code>
      </p>
    </div>
  );
};

export default LoginForm;