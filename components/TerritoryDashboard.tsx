
import React, { useState } from 'react';
import type { TerritoryData } from '../types';
import DashboardCard from './DashboardCard';
import { analyzeTerritoryPerformance } from '../services/geminiService';

interface TerritoryDashboardProps {
    data: TerritoryData;
}

const TerritoryDashboard: React.FC<TerritoryDashboardProps> = ({ data }) => {
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalysis = async () => {
        setLoading(true);
        try {
            const res = await analyzeTerritoryPerformance(data.stats.regionName, data.stats.totalSalesVolume);
            setAiAnalysis(res);
        } catch (e) {
            setAiAnalysis("Analysis failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 text-center">Territory Partner Panel</h2>
             <p className="text-center text-text-secondary mb-8">Regional Supervision & Growth</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card p-4 rounded-xl border border-orange-200">
                    <p className="text-sm font-medium text-text-secondary">Region</p>
                    <p className="text-xl font-bold text-text-primary mt-1">{data.stats.regionName}</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-orange-200">
                    <p className="text-sm font-medium text-text-secondary">Total Merchants</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">{data.stats.totalMerchants}</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-orange-200">
                    <p className="text-sm font-medium text-text-secondary">Total Sales Vol</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{data.stats.totalSalesVolume}</p>
                </div>
                <div className="bg-orange-500 text-white p-4 rounded-xl shadow-lg transform scale-105">
                    <p className="text-sm font-medium opacity-90">My Supervision Fee</p>
                    <p className="text-3xl font-bold mt-1">{data.stats.supervisionFee}</p>
                    <p className="text-xs opacity-80 mt-1">0.5% Ujrah al-Ishraf</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2">
                    <DashboardCard title="Top Performers" icon={<StarIcon />}>
                         <div className="space-y-4">
                            {data.topPerformers.map((p, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 border-b border-orange-100 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-orange-500">#{idx+1}</span>
                                        <div>
                                            <p className="font-bold text-text-primary">{p.name}</p>
                                            <p className="text-xs text-text-secondary">{p.role}</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-green-600">{p.volume}</span>
                                </div>
                            ))}
                         </div>
                    </DashboardCard>
                </div>
                <div className="flex flex-col">
                    <DashboardCard title="AI Territory Analysis" icon={<MapIcon />}>
                        {aiAnalysis ? (
                            <div className="text-sm text-text-secondary whitespace-pre-line">{aiAnalysis}</div>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-text-secondary mb-4">Get growth strategies for {data.stats.regionName}</p>
                                <button 
                                    onClick={handleAnalysis}
                                    disabled={loading}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600"
                                >
                                    {loading ? "Analyzing..." : "Analyze Territory"}
                                </button>
                            </div>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10l6-3m0 0V7" /></svg>;

export default TerritoryDashboard;
