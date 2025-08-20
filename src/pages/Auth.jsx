import React from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthPage from '../components/auth/AuthPage';

// Main Auth Component with routing logic
const Auth = () => {
  const { user, loading } = useAuth();
  console.log('Auth - user:', user, 'loading:', loading);


  /*if (loading) {
    return (
      <div className='min-h-screen bg-gray-300 flex items-center justify-center'>
        <div className="flex flex-col items-center text-black">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className='text-black'>Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className='min-h-screen bg-gray-300 flex items-center justify-center'>
        <div className="bg-black backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-gray-400 mb-6">You are successfully authenticated as {user.email}</p>
          <button
            onClick={signOut} // signOut from useAuth (supabase)
            className="
              w-full py-3 bg-white/10 
              hover:bg-gray-400
              text-white font-semibold rounded-lg
              transition-all duration-300 ease-out
              hover:scale-105 hover:shadow-lg hover:shadow-gray-400/30
            "
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  } */

  return <AuthPage />;
};

export default Auth;