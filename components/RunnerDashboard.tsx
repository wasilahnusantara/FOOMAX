
import React from 'react';
import type { RunnerData } from '../types';
import DashboardCard from './DashboardCard';
import RouteOptimizerCard from './RouteOptimizerCard';
import AlertsCard from './AlertsCard';

interface RunnerDashboardProps {
    data: RunnerData;
}

const RunnerDashboard: React.FC<RunnerDashboardProps> = ({ data }) => {
    const getStatusColor = (status: 'Pending Pickup' | 'In Transit' | 'Delivered') => {
        switch (status) {
            case 'Pending Pickup': return 'bg-yellow-900/50 text-yellow-300 ring-1 ring-yellow-400/30';
            case 'In Transit': return 'bg-blue-900/50 text-blue-300 ring-1 ring-blue-400/30';
            case 'Delivered': return 'bg-green-900/50 text-green-300 ring-1 ring-green-400/30';
        }
    };

    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">Runner Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                
                {/* Column 1 */}
                <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
                    
                    <DashboardCard title="Active Orders" icon={<ClipboardListIcon />}>
                        <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-2">
                            {data.activeOrders.map(order => (
                                <div key={order.id} className="p-4 bg-background rounded-lg border border-border-color hover:border-brand-green-light/50 transition-colors duration-300">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <p className="font-bold text-text-primary">{order.restaurant}</p>
                                            <p className="text-sm text-text-secondary mt-1">To: {order.customerName}</p>
                                            <p className="text-xs text-text-secondary/70 mt-1">{order.deliveryAddress}</p>
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                     <AlertsCard alerts={data.alerts} />
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6 md:gap-8">
                     <DashboardCard title="Performance Stats" icon={<ChartBarIcon />}>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center border-b border-border-color pb-3">
                                <span className="font-medium text-text-secondary">Completed Deliveries</span>
                                <span className="font-bold text-brand-green-light text-xl">{data.stats.completedDeliveries}</span>
                            </li>
                             <li className="flex justify-between items-center border-b border-border-color pb-3">
                                <span className="font-medium text-text-secondary">Avg. Delivery Time</span>
                                <span className="font-bold text-brand-green-light text-xl">{data.stats.averageDeliveryTime}</span>
                            </li>
                             <li className="flex justify-between items-center">
                                <span className="font-medium text-text-secondary">Total Earnings</span>
                                <span className="font-bold text-brand-green-light text-xl">{data.stats.totalEarnings}</span>
                            </li>
                        </ul>
                    </DashboardCard>
                    <RouteOptimizerCard orders={data.activeOrders} />
                </div>
            </div>
        </div>
    );
};

// Icons
const ClipboardListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);


export default RunnerDashboard;