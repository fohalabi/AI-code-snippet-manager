import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/dashboard/layout/DashboardNavbar';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" />;

    return (
        <div>
            <Navbar />
            <h1>Welcome to your dashboard, {user.email}!</h1>
        </div>
    );
}