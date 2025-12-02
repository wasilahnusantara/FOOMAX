
import React from 'react';
import type { MemberData } from '../types';
import DashboardCard from './DashboardCard';
import RecommendationsCard from './RecommendationsCard';

interface MemberDashboardProps {
    data: MemberData;
    onUpgrade?: () => void;
    isMarketer?: boolean;
}

const MemberDashboard: React.FC<MemberDashboardProps> = ({ data, onUpgrade, isMarketer }) => {
    return (
        <div className="w-full max-w-6xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
                Welcome back, <span className="text-orange-500">{data.name}</span>!
             </h2>

             {/* UPGRADE PROMO BANNER (Only for Regular Members) */}
             {!isMarketer && onUpgrade && (
                 <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 mb-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                         <div className="bg-white/20 p-3 rounded-full">
                             <TrendingUpIcon />
                         </div>
                         <div>
                             <h3 className="text-xl font-bold">Mau dapat penghasilan tambahan?</h3>
                             <p className="text-orange-100 opacity-90">Gabung jadi Marketer dan dapatkan komisi 3% dari setiap pesanan!</p>
                         </div>
                     </div>
                     <button 
                        onClick={onUpgrade}
                        className="bg-white text-orange-600 font-bold py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors shadow-sm whitespace-nowrap"
                    >
                         Aktifkan Akun Marketer
                     </button>
                 </div>
             )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                
                {/* Column 1: Order History */}
                <div className="lg:col-span-2">
                     <DashboardCard title="Your Order History" icon={<HistoryIcon />}>
                       <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {data.orderHistory.map(order => (
                                <div key={order.id} className="flex justify-between items-center p-4 bg-background rounded-lg border border-orange-200 hover:border-orange-400 transition-colors duration-300">
                                    <div>
                                        <p className="font-bold text-text-primary">{order.dishName}</p>
                                        <p className="text-sm text-text-secondary">from {order.restaurant}</p>
                                    </div>
                                    <p className="text-sm font-medium text-text-secondary bg-orange-50 border border-orange-100 px-2 py-1 rounded-md">{order.date}</p>
                                </div>
                            ))}
                       </div>
                    </DashboardCard>
                </div>

                {/* Column 2: Recommendations and Favorites */}
                <div className="flex flex-col gap-6 md:gap-8">
                    <RecommendationsCard orderHistory={data.orderHistory} />
                     <DashboardCard title="Favorite Recipes" icon={<HeartIcon />}>
                        <div className="text-center py-4 flex flex-col items-center justify-center h-full">
                            <p className="text-text-secondary">Your saved recipes will appear here.</p>
                            <p className="text-sm text-text-secondary/50 mt-1">Feature coming soon!</p>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

// Icons
const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);
const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


export default MemberDashboard;
