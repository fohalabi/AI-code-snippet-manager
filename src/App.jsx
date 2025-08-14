import React from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './pages/Auth';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
