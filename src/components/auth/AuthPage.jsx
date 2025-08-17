import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SocialAuthButtons from './SocialAuthButton'
import { useAuth } from '../../hooks/useAuth';

// Auth Page Component
const AuthPage = ({ initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [notification, setNotification] = useState(null);

  const { signIn, signUp, signInWithGoogle, signInWithGithub, loading} = useAuth();
  
  // Get Supabase auth functions
  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEmailAuth = async (email, password, name = null) => {
    try {
      let result;
      if (mode === 'login'){
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        showNotification(result.error.message, 'error');
      } else {
        showNotification(`${mode === 'login' ? 'Signed in' : 'Account created'} successfully!`, 'success');
      }
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const handleSocialAuth = async (provider) => {
    try {
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else {
        result = await signInWithGithub();
      }

      if (result.error) {
        showNotification(result.error.message, 'error');
      } else {
        showNotification(`Signed in with ${provider} successfully!`, 'success');
      }

    } catch (error) {
      showNotification(`Failed to sign in with ${provider}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Notification */}
      {notification && (
        <div className={`
          fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg backdrop-blur-sm border
          transition-all duration-500 ease-out
          ${notification.type === 'success' 
            ? 'bg-green-500/20 border-green-500/50 text-green-100' 
            : 'bg-red-500/20 border-red-500/50 text-red-100'
          }
        `}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            <span className="text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Welcome Back
            </h1>
            <p className="text-black/70">
              {mode === 'login' 
                ? 'Sign in to your account to continue' 
                : 'Create your account to get started'
              }
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1 mb-8">
            <button
              onClick={() => setMode('login')}
              disabled={loading}
              className={`
                flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300
                ${mode === 'login'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-400 hover:text-black'
                }
              `}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              disabled={loading}
              className={`
                flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300
                ${mode === 'signup'
                  ? 'bg-black text-white shadow-lg'
                  : 'text-gray-400 hover:text-black'
                }
              `}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-500 ease-out">
            {mode === 'login' ? (
              <LoginForm onSubmit={handleEmailAuth} loading={loading} />
            ) : (
              <SignupForm onSubmit={handleEmailAuth} loading={loading} />
            )}
          </div>

          {/* Social Auth */}
          <div className="mt-8">
            <SocialAuthButtons
              onGoogleAuth={() => handleSocialAuth('google')}
              onGitHubAuth={() => handleSocialAuth('github')}
              loading={loading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Secure authentication powered by modern encryption
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default AuthPage;