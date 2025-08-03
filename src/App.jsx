import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className='min-h-screen bg-gray-900 text-gray-100 font-mono'>
        {user ? (
          <div>
            <button onClick={() => auth.signOut()} className='btn-primary mt-4 ml-6'>Logout</button>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
            </Routes>
          </div>
        ) : (
          <Login onLogin={(user) => setUser(user)} />
        )}
      </div>
    </Router>
  );
}
export default App
