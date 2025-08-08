// Auth utility functions
const AuthUtils = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword: (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    
    return { valid: errors.length === 0, errors };
  },

  // Mock auth functions - replace with your actual API calls
  login: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    if (email === 'demo@example.com' && password === 'password123') {
      const user = { id: 1, name: 'Demo User', email };
      const token = 'mock-jwt-token';
      // Note: In production, use secure storage instead of localStorage
      localStorage.setItem('authToken', token);
      return { user, token };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (email, password, name) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const user = { id: Date.now(), name, email };
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('authToken', token);
    return { user, token };
  },

  loginWithGoogle: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const user = { id: Date.now(), name: 'Google User', email: 'google@example.com' };
    const token = 'mock-google-token';
    localStorage.setItem('authToken', token);
    return { user, token };
  },

  loginWithGitHub: async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const user = { id: Date.now(), name: 'GitHub User', email: 'github@example.com' };
    const token = 'mock-github-token';
    localStorage.setItem('authToken', token);
    return { user, token };
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('authToken');
    return token ? { name: 'Current User', email: 'user@example.com' } : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  logout: () => {
    localStorage.removeItem('authToken');
  }
};

export default AuthUtils;