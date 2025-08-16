import React, { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/Auth';
import { supabase } from './lib/supabaseClient'
import './index.css';

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Only redirect if user is on auth pages
          if (location.pathname === '/auth' || location.pathname === '/') {
            navigate('/dashboard');
          }
        }
        if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    return () => authListener?.subscription?.unsubscribe();
  }, [navigate, location]);

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
