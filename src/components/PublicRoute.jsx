import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children, redirectAuthenticated = false }) => {
    const { user, loading } = useAuth();

    console.log('PublicRoute - user:', user, 'loading:', loading, 'redirectAuthenticated:', redirectAuthenticated);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (user && redirectAuthenticated) {
        // If user is authenticated and tries to access login/landing, redirect to dashboard
        return <Navigate to='/dashboard' replace />; 
    }

    return children;
};

export default PublicRoute;