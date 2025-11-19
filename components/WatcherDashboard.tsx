
import React from 'react';
import type { WatcherData, AdminStats } from '../types';
import DashboardCard from './DashboardCard';
import AnomalyDetectorCard from './AnomalyDetectorCard';

interface WatcherDashboardProps {
    watcherData: WatcherData;
    stats: AdminStats;
}

const MetricCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-card p-4 rounded-xl border border-border-color transition-all duration-300 hover:border-brand-green-light/50 hover:shadow-brand-green-light/10 transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <div className="text-brand-green-light/70">
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
    </div>
);

const WatcherDashboard: React.FC<WatcherDashboardProps> = ({ watcherData, stats }) => {
    
    const getLogLevelColor = (level: 'info' | 'warning' | 'error') => {
        switch (level) {
            case 'info': return 'text-blue-400';
            case 'warning': return 'text-yellow-400';
            case 'error': return 'text-red-400';
            default: return 'text-gray-500';
        }
    };
    
    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 text-center">Watcher Panel</h2>
             <p className="text-center text-text-secondary mb-8">Real-time System Monitoring & Anomaly Detection</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <MetricCard title="System Uptime" value={watcherData.performance.uptime} icon={<ServerIcon />} />
                <MetricCard title="API Latency" value={watcherData.performance.apiLatency} icon={<ZapIcon />} />
                <MetricCard title="Database Usage" value={watcherData.performance.dbUsage} icon={<DatabaseIcon />} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <DashboardCard title="Live Activity Log" icon={<TerminalIcon />}>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto pr-2">
                            {watcherData.liveLogs.map(log => (
                                <p key={log.id} className="whitespace-pre-wrap">
                                    <span className="text-text-secondary/50 mr-2">{log.timestamp}</span>
                                    <span className={`font-bold mr-2 ${getLogLevelColor(log.level)}`}>[{log.level.toUpperCase()}]</span>
                                    <span className="text-text-secondary">{log.message}</span>
                                </p>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
                <div className="flex flex-col">
                    <AnomalyDetectorCard logs={watcherData.liveLogs} />
                </div>
            </div>
        </div>
    );
};

// Icons
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
const TerminalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;


export default WatcherDashboard;
