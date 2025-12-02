
import React from 'react';
import type { DashboardData } from '../types';
import DashboardCard from './DashboardCard';
import DishOfTheDayCard from './DishOfTheDayCard';

interface MerchantDashboardProps {
    data: DashboardData;
}

const MerchantDashboard: React.FC<MerchantDashboardProps> = ({ data }) => {
    return (
        <div className="w-full max-w-6xl animate-fade-in">
             <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">Merchant Dashboard</h2>
                <p className="text-text-secondary">Sales Overview & Agency Performance</p>
             </div>

            {/* Akad & Agreement Card (NEW) */}
            <div className="mb-8 bg-white rounded-2xl shadow-sm border border-orange-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    TERVERIFIKASI SYARIAH
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 bg-orange-50 p-3 rounded-full text-orange-600">
                        <ScaleIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-primary mb-2">Akad Kerjasama Agensi (Ju'alah & Wakalah)</h3>
                        <div className="flex items-start gap-3 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                            <div className="mt-1 text-green-600">
                                <CheckCircleIcon />
                            </div>
                            <div>
                                <p className="text-text-secondary font-medium leading-relaxed italic">
                                    "Saya menyetujui pemotongan Komisi Pemasaran & Layanan sebesar <span className="font-bold text-orange-600">5.5%</span> dari harga jual per transaksi sukses (Akad Ju'alah), dan memberi kuasa kepada Platform untuk mendistribusikannya."
                                </p>
                                <p className="text-xs text-text-secondary/60 mt-2">
                                    *Status: Disetujui pada saat pendaftaran.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-3 py-1 bg-white border border-orange-200 rounded-full text-xs font-semibold text-orange-600">
                                Ju'alah: Upah atas penjualan sukses
                            </span>
                            <span className="px-3 py-1 bg-white border border-orange-200 rounded-full text-xs font-semibold text-orange-600">
                                Wakalah: Kuasa distribusi dana
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Breakdown - The 5.5% Split Context */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-orange-100">
                    <p className="text-sm font-medium text-text-secondary">Gross Sales</p>
                    <p className="text-2xl font-bold text-text-primary">{data.financials.grossSales}</p>
                    <p className="text-xs text-orange-500 mt-1">Total Transactions: {data.financials.totalTransactions}</p>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl shadow-md border border-red-100">
                    <p className="text-sm font-medium text-red-600">Marketing Cost (5.5%)</p>
                    <p className="text-2xl font-bold text-red-700">-{data.financials.marketingCost}</p>
                    <p className="text-xs text-red-500 mt-1">Agency & Affiliate Fees (Ju'alah)</p>
                </div>
                <div className="bg-green-50 p-6 rounded-2xl shadow-md border border-green-100">
                    <p className="text-sm font-medium text-green-600">Net Payout</p>
                    <p className="text-2xl font-bold text-green-700">{data.financials.netPayout}</p>
                    <p className="text-xs text-green-500 mt-1">Ready for Disbursement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                
                <DishOfTheDayCard trendingIngredients={data.trendingIngredients} />

                <DashboardCard title="Top Selling Dishes" icon={<TrendingUpIcon />}>
                    <ul className="space-y-3">
                        {data.popularDishes.map((dish, index) => (
                           <li key={index} className="flex items-center text-text-secondary border-b border-orange-100 pb-2 last:border-b-0">
                             <span className="text-orange-500 font-bold mr-3 text-lg">{index + 1}.</span> 
                             {dish}
                           </li>
                        ))}
                    </ul>
                </DashboardCard>

                <div className="lg:col-span-2">
                    <DashboardCard title="Trending Ingredients" icon={<SparklesIcon />}>
                        <div className="flex flex-wrap gap-3">
                            {data.trendingIngredients.map((ingredient, index) => (
                                <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-105">
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

// Icons
const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11.73 9 11 6.82 8.82 6l2.18-1.09L12 3m-1 15l-1.09-2.18L8.82 15l2.18-1.09L12 11.73l.27 2.18 2.18 1.09-2.18 1.09L12 18m9-11l1.09 2.18L24 10l-2.18 1.09L20.73 13 20 10.82 17.82 10l2.18-1.09L21 7z" />
    </svg>
);

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export default MerchantDashboard;
