
import React, { useState } from 'react';
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

type AdminTab = 'overview' | 'merchants' | 'ads' | 'finance' | 'users' | 'notifications' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminData, platformData }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Sidebar Navigation Component
    const SidebarItem = ({ id, label, icon }: { id: AdminTab, label: string, icon: React.ReactNode }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === id ? 'bg-brand-green-dark text-white shadow-md' : 'text-text-secondary hover:bg-orange-50 hover:text-orange-600'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    // CONTENT RENDERERS
    const renderOverview = () => (
        <div className="space-y-6 animate-fade-in">
             {/* Stats Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Merchants" value={adminData.stats.totalMerchants} icon={<StoreIcon />} />
                <StatCard title="Total Marketers" value={adminData.stats.totalMarketers} icon={<UsersIcon />} />
                <StatCard title="Platform Rev (1.0%)" value={adminData.stats.totalPlatformRevenue} icon={<ChartIcon />} />
                <StatCard title="Infaq Collected (1.0%)" value={adminData.stats.totalInfaqCollected} icon={<HeartIcon />} highlight />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard title="System Health" icon={<ShieldCheckIcon />}>
                    <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Current Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${maintenanceMode ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {maintenanceMode ? 'Maintenance' : adminData.systemStatus}
                        </span>
                    </div>
                </DashboardCard>
                <AdminInsightsCard popularDishes={platformData.popularDishes} marketerStats={platformData.marketerStats} />
            </div>
        </div>
    );

    const renderMerchants = () => (
        <div className="animate-fade-in space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-primary">Merchant Management (KYC)</h3>
                <button className="bg-brand-green-dark text-white px-4 py-2 rounded-lg text-sm font-bold">Add Merchant</button>
            </div>
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Merchant Name</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Join Date</th>
                            <th className="px-6 py-4">Documents (SSM/Halal)</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {adminData.merchants.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-medium text-text-primary">{m.name}</td>
                                <td className="px-6 py-4 text-text-secondary">{m.location}</td>
                                <td className="px-6 py-4 text-text-secondary">{m.joinDate}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        <span className={`px-2 py-0.5 rounded text-xs ${m.documents.ssm ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>SSM</span>
                                        <span className={`px-2 py-0.5 rounded text-xs ${m.documents.halalCert ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>Halal</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                        m.status === 'active' ? 'bg-green-100 text-green-700' : 
                                        m.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {m.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-brand-green-dark hover:underline font-medium">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAds = () => (
        <div className="animate-fade-in space-y-4">
            <h3 className="text-xl font-bold text-text-primary">Ads Approval Queue</h3>
            <div className="grid gap-4">
                {adminData.adRequests.map((ad) => (
                    <div key={ad.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-text-primary">{ad.merchantName}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">ID: {ad.id}</span>
                            </div>
                            <p className="text-text-secondary mt-1">Content: "{ad.content}"</p>
                            <p className="text-sm text-orange-500 mt-1 font-medium">Budget: {ad.budget} ({ad.duration})</p>
                        </div>
                        <div className="flex gap-2">
                            {ad.status === 'pending' ? (
                                <>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 shadow-sm">Approve</button>
                                    <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200">Reject</button>
                                </>
                            ) : (
                                <span className="px-4 py-2 bg-gray-100 text-gray-500 font-bold rounded-lg cursor-not-allowed">
                                    {ad.status.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFinance = () => (
        <div className="animate-fade-in space-y-4">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-text-primary">Financial Transactions</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-orange-500/20 shadow-lg">Download Report</button>
            </div>
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-orange-50 text-orange-800 font-medium border-b border-orange-100">
                        <tr>
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Merchant</th>
                            <th className="px-6 py-4">Gross Amount</th>
                            <th className="px-6 py-4 text-orange-600">Agency Fee (5.5%)</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {adminData.financeLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{log.id}</td>
                                <td className="px-6 py-4 text-text-secondary">{log.date}</td>
                                <td className="px-6 py-4 font-medium">{log.merchant}</td>
                                <td className="px-6 py-4 font-bold text-text-primary">{log.amount}</td>
                                <td className="px-6 py-4 font-bold text-orange-600">{log.agencyFee}</td>
                                <td className="px-6 py-4">
                                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                        log.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {log.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="animate-fade-in max-w-2xl">
            <h3 className="text-xl font-bold text-text-primary mb-4">Push Notifications</h3>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark">
                        <option>All Users (Broadcast)</option>
                        <option>All Merchants</option>
                        <option>All Marketers</option>
                        <option>Users in Jakarta Selatan</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Title</label>
                    <input type="text" placeholder="e.g. Promo Makan Siang!" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                    <textarea rows={4} placeholder="Type your message here..." className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green-dark"></textarea>
                </div>
                <button className="w-full bg-brand-green-dark text-white font-bold py-3 rounded-lg hover:bg-opacity-90 shadow-lg">
                    Send Broadcast
                </button>
            </div>
        </div>
    );

    const renderSettings = () => (
         <div className="animate-fade-in max-w-2xl space-y-6">
            <h3 className="text-xl font-bold text-text-primary">Platform Settings</h3>
            
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-lg text-text-primary">Maintenance Mode</h4>
                    <p className="text-sm text-text-secondary">Disable access to the app for all users except Admin.</p>
                </div>
                <button 
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-red-500' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                <h4 className="font-bold text-lg text-text-primary mb-4">Admin Staff Management</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-green-dark text-white flex items-center justify-center font-bold">SA</div>
                            <div>
                                <p className="font-bold text-sm">Super Admin</p>
                                <p className="text-xs text-gray-500">ceo.foomax@gmail.com</p>
                            </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Owner</span>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">FI</div>
                            <div>
                                <p className="font-bold text-sm">Finance Staff</p>
                                <p className="text-xs text-gray-500">finance@foomax.com</p>
                            </div>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">Limited Access</span>
                    </div>
                </div>
                <button className="mt-4 w-full border border-gray-300 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">Add New Staff</button>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-[95vw] animate-fade-in flex flex-col md:flex-row gap-6 min-h-[80vh]">
             
             {/* LEFT SIDEBAR */}
             <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky top-24">
                    <div className="mb-6 px-4">
                        <h2 className="text-lg font-extrabold text-brand-green-dark tracking-wide">ADMIN PORTAL</h2>
                        <p className="text-xs text-gray-400 font-mono">v1.2.0 (Stable)</p>
                    </div>
                    <nav className="space-y-1">
                        <SidebarItem id="overview" label="Dashboard Overview" icon={<HomeIcon />} />
                        <SidebarItem id="merchants" label="Merchant Management" icon={<StoreIcon />} />
                        <SidebarItem id="ads" label="Ads Manager" icon={<MegaphoneIcon />} />
                        <SidebarItem id="finance" label="Finance & Comms." icon={<CashIcon />} />
                        <SidebarItem id="users" label="User Management" icon={<UsersIcon />} />
                        <SidebarItem id="notifications" label="Push Notifications" icon={<BellIcon />} />
                        <SidebarItem id="settings" label="System Settings" icon={<CogIcon />} />
                    </nav>
                </div>
             </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-grow bg-white/50 rounded-xl md:p-2">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'merchants' && renderMerchants()}
                {activeTab === 'ads' && renderAds()}
                {activeTab === 'finance' && renderFinance()}
                {activeTab === 'users' && <div className="p-8 text-center text-gray-500">User Management Module - Coming Soon</div>}
                {activeTab === 'notifications' && renderNotifications()}
                {activeTab === 'settings' && renderSettings()}
            </div>

        </div>
    );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; highlight?: boolean }> = ({ title, value, icon, highlight }) => (
    <div className={`p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${highlight ? 'bg-orange-500 text-white border-orange-600 shadow-orange-500/30 shadow-lg' : 'bg-white text-text-primary border-gray-200 shadow-sm'}`}>
        <div className="flex justify-between items-start">
            <p className={`text-sm font-medium ${highlight ? 'text-white/80' : 'text-text-secondary'}`}>{title}</p>
            <div className={highlight ? 'text-white' : 'text-orange-500'}>
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold mt-2">{typeof value === 'number' ? value.toLocaleString() : value}</p>
    </div>
);

// Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const StoreIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-2.606 11.955 11.955 0 019 2.606 12.02 12.02 0 00-1.382-9.008z" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default AdminDashboard;
