
import React from 'react';
import type { AdminData, DashboardData, RunnerStats } from '../types';
import DashboardCard from './DashboardCard';
import AdminInsightsCard from './AdminInsightsCard';

interface AdminDashboardProps {
    adminData: AdminData;
    platformData: {
        popularDishes: DashboardData['popularDishes'];
        runnerStats: RunnerStats;
    }
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-card p-4 rounded-xl border border-border-color transition-all duration-300 hover:border-brand-green-light/50 hover:shadow-brand-green-light/10 transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <div className="text-brand-green-light/70">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-text-primary mt-2">{value.toLocaleString()}</p>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, platformData }) => {
    
    const getActivityIcon = (type: 'new_user' | 'new_restaurant' | 'milestone') => {
        switch(type) {
            case 'new_user': return <UserAddIcon />;
            case 'new_restaurant': return <StoreIcon />;
            case 'milestone': return <TrophyIcon />;
        }
    };

    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 text-center">Admin Panel</h2>
             <p className="text-center text-text-secondary mb-8">Platform Overview & Management</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Users" value={adminData.stats.totalUsers} icon={<UsersIcon />} />
                <StatCard title="Total Restaurants" value={adminData.stats.totalRestaurants} icon={<StoreIcon />} />
                <StatCard title="Total Runners" value={adminData.stats.totalRunners} icon={<MotorcycleIcon />} />
                <StatCard title="Total Orders" value={adminData.stats.totalOrders} icon={<ClipboardListIcon />} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <DashboardCard title="Recent Activity" icon={<ClockIcon />}>
                        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {adminData.recentActivity.map(activity => (
                                <li key={activity.id} className="flex items-center gap-4 p-3 bg-background rounded-md">
                                    <div className="text-brand-green-light flex-shrink-0 bg-brand-green-dark/20 p-2 rounded-full">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <p className="text-text-secondary text-sm">{activity.description}</p>
                                </li>
                            ))}
                        </ul>
                    </DashboardCard>
                </div>
                <div className="flex flex-col gap-6 md:gap-8">
                    <DashboardCard title="System Status" icon={<ShieldCheckIcon />}>
                        <div className="flex items-center justify-center gap-2 py-4 h-full">
                             <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                             <p className="font-semibold text-green-400 text-lg">{adminData.systemStatus}</p>
                        </div>
                    </DashboardCard>
                    <AdminInsightsCard popularDishes={platformData.popularDishes} runnerStats={platformData.runnerStats} />
                </div>
            </div>
        </div>
    );
};


// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.284-.24-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.284.24-1.857m11.52 1.857a3 3 0 00-5.356 0M12 14v3m-3-3v3m6-3v3M12 14a3 3 0 01-3-3V7a3 3 0 116 0v4a3 3 0 01-3 3z" /></svg>;
const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const MotorcycleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M16 6h4v4h-4M4 16a2 2 0 114 0 2 2 0 01-4 0zM16 16a2 2 0 114 0 2 2 0 01-4 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m-4-4h8" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-1.382-9.008z" /></svg>;
const UserAddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 19a7 7 0 110-14 7 7 0 010 14z" /></svg>;


export default AdminDashboard;