
import React from 'react';
import type { AdminData, DashboardData, MarketerStats } from '../types';
import DashboardCard from './DashboardCard';
import AdminInsightsCard from './AdminInsightsCard';

interface AdminDashboardProps {
    adminData: AdminData;
    platformData: {
        popularDishes: DashboardData['popularDishes'];
        marketerStats: MarketerStats;
    }
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; highlight?: boolean }> = ({ title, value, icon, highlight }) => (
    <div className={`p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${highlight ? 'bg-orange-500 text-white border-orange-600' : 'bg-card text-text-primary border-orange-200'}`}>
        <div className="flex justify-between items-start">
            <p className={`text-sm font-medium ${highlight ? 'text-white/80' : 'text-text-secondary'}`}>{title}</p>
            <div className={highlight ? 'text-white' : 'text-orange-500'}>
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold mt-2">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, platformData }) => {
    
    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 text-center">Admin Panel (HQ)</h2>
             <p className="text-center text-text-secondary mb-8">Agency Management & Sharia Compliance Overview</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Merchants" value={adminData.stats.totalMerchants} icon={<StoreIcon />} />
                <StatCard title="Total Marketers" value={adminData.stats.totalMarketers} icon={<UsersIcon />} />
                <StatCard title="Platform Rev (1.0%)" value={adminData.stats.totalPlatformRevenue} icon={<ChartIcon />} />
                <StatCard title="Infaq Collected (1.0%)" value={adminData.stats.totalInfaqCollected} icon={<HeartIcon />} highlight />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <DashboardCard title="Recent Activity" icon={<ClockIcon />}>
                        <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {adminData.recentActivity.map(activity => (
                                <li key={activity.id} className="flex items-center gap-4 p-3 bg-white rounded-md border border-orange-100">
                                    <div className="text-orange-500 flex-shrink-0 bg-orange-100 p-2 rounded-full">
                                        <InfoIcon />
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
                             <p className="font-semibold text-green-600 text-lg">{adminData.systemStatus}</p>
                        </div>
                    </DashboardCard>
                    <AdminInsightsCard popularDishes={platformData.popularDishes} marketerStats={platformData.marketerStats} />
                </div>
            </div>
        </div>
    );
};


// Icons
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.284-.24-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.084-1.284.24-1.857m11.52 1.857a3 3 0 00-5.356 0M12 14v3m-3-3v3m6-3v3M12 14a3 3 0 01-3-3V7a3 3 0 116 0v4a3 3 0 01-3 3z" /></svg>;
const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-1.382-9.008z" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default AdminDashboard;
