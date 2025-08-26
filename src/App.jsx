import React, { useState, useEffect} from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './index.css';

function AppRoutes() {

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } 
      />
      
      <Route 
        path='/auth' 
        element={
          <PublicRoute redirectAuthenticated={true}>
            <Auth />
          </PublicRoute>
        } 
      />
      
      <Route 
        path='/dashboard' 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;