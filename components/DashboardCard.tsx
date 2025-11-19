
import React from 'react';

interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => {
    return (
        <div className="bg-card rounded-2xl shadow-xl border border-border-color overflow-hidden transition-all duration-300 hover:border-brand-green-light/30 hover:shadow-brand-green-light/5">
            <div className="flex items-center gap-3 p-4 bg-white/5 border-b border-border-color">
                <div className="text-brand-green-light">
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary">{title}</h3>
            </div>
            <div className="p-6 text-text-secondary">
                {children}
            </div>
        </div>
    );
};

export default DashboardCard;