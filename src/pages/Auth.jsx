import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthPage from '../components/auth/AuthPage';

// Main Auth Component with routing logic
const Auth = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className="flex flex-col items-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className='text-gray-400'>Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-gray-400 mb-6">You are successfully authenticated as {user.email}</p>
          <button
            onClick={signOut} // signOut from useAuth (supabase)
            className="
              w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 
              hover:from-red-700 hover:to-pink-700 
              text-white font-semibold rounded-lg
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-lg hover:shadow-red-500/30
            "
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <AuthPage />;
};

export default Auth;