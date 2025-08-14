import { useAuth } from '..hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    return <div>Welcome to your dashboard, {user.email}!</div>;
}