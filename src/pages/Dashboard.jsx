import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/dashboard/layout/DashboardLayout';
import QuickActionsPanel from '../components/dashboard/overview/QuickActionsPanel';
import DashboardHeader from '../components/dashboard/overview/DashboardHeader';
import RecentActivityFeed from '../components/dashboard/overview/RecentActivityFeed';
import { Navigate } from 'react-router-dom';
import AIInsightsPanel from '../components/dashboard/ai/AIInsightsPanel';
import CollectionsOverview from '../components/dashboard/overview/CollectionsOverview';

export default function Dashboard() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" />;

    return (
        <div>
            <DashboardLayout>
                <DashboardHeader />
                <QuickActionsPanel />
                <RecentActivityFeed />
                <AIInsightsPanel />
                <CollectionsOverview />
            </DashboardLayout>
        </div>
    );
}