import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/dashboard/layout/DashboardNavbar';
import QuickActionsPanel from '../components/dashboard/overview/QuickActionsPanel';
import DashboardHeader from '../components/dashboard/overview/DashboardHeader';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" />;

    return (
        <div>
            <Navbar />
            <DashboardHeader />
            <QuickActionsPanel />
        </div>
    );
}