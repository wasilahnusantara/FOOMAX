
import React from 'react';
import type { RunnerAlert } from '../types';
import DashboardCard from './DashboardCard';

interface AlertsCardProps {
    alerts: RunnerAlert[];
}

const AlertIcon: React.FC<{ type: RunnerAlert['type'] }> = ({ type }) => {
    switch (type) {
        case 'new_order':
            return <div className="bg-yellow-400 p-2 rounded-full"><BellIcon /></div>;
        case 'urgent':
            return <div className="bg-red-500 p-2 rounded-full"><PackageIcon /></div>;
        case 'warning':
            return <div className="bg-yellow-500 p-2 rounded-full"><WarningIcon /></div>;
        case 'info':
            return <div className="bg-blue-500 p-2 rounded-full"><InfoIcon /></div>;
        default:
            return null;
    }
};

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
    return (
        <DashboardCard title="Alerts & Notifications" icon={<NotificationIcon />}>
            {alerts.length > 0 ? (
                <ul className="space-y-3">
                    {alerts.map(alert => (
                        <li key={alert.id} className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                                <AlertIcon type={alert.type} />
                            </div>
                            <p className="text-text-secondary text-sm flex-1">{alert.message}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-text-secondary text-center py-4">No new notifications.</p>
            )}
        </DashboardCard>
    );
};

// Main Card Icon
const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);

// Alert Type Icons (inspired by user image)
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
const PackageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);


export default AlertsCard;