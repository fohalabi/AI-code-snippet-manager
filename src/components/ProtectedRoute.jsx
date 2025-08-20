import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to Login but remember where they were trying to go
        return <Navigate to='/auth' state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;