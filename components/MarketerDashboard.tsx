
import React, { useState } from 'react';
import type { MarketerData } from '../types';
import DashboardCard from './DashboardCard';
import { generateMarketingCopy } from '../services/geminiService';

interface MarketerDashboardProps {
    data: MarketerData;
}

const CopyGeneratorCard: React.FC = () => {
    const [dish, setDish] = useState('');
    const [copy, setCopy] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if(!dish) return;
        setLoading(true);
        try {
            const result = await generateMarketingCopy(dish, "WhatsApp/TikTok");
            setCopy(result);
        } catch(e) {
            setCopy("Error generating copy. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardCard title="AI Viral Copywriter" icon={<PenIcon />}>
            <div className="space-y-3">
                <input 
                    type="text" 
                    placeholder="Dish Name (e.g. Nasi Goreng)"
                    className="w-full p-2 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-500"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                />
                <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition"
                >
                    {loading ? "Writing..." : "Generate Caption"}
                </button>
                {copy && (
                    <div className="p-3 bg-orange-50 rounded-lg text-sm text-text-secondary mt-2 border border-orange-100">
                        {copy}
                    </div>
                )}
            </div>
        </DashboardCard>
    )
}

const MarketerDashboard: React.FC<MarketerDashboardProps> = ({ data }) => {
    return (
        <div className="w-full max-w-7xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">
                Marketer Panel <span className="text-orange-500">({data.name})</span>
             </h2>

             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card p-6 rounded-2xl border border-orange-200 shadow-md">
                    <p className="text-text-secondary font-medium">Total Ju'alah (Commission)</p>
                    <p className="text-3xl font-bold text-orange-600">{data.stats.totalCommission}</p>
                    <p className="text-xs text-text-secondary mt-1">3.0% Rate</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-orange-200 shadow-md">
                    <p className="text-text-secondary font-medium">Sales Generated</p>
                    <p className="text-3xl font-bold text-text-primary">{data.stats.totalSalesGenerated}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-orange-200 shadow-md">
                    <p className="text-text-secondary font-medium">Conversion Rate</p>
                    <p className="text-3xl font-bold text-green-600">{data.stats.conversionRate}</p>
                </div>
             </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Active Campaigns */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <DashboardCard title="Active Campaigns" icon={<MegaphoneIcon />}>
                        <div className="space-y-4">
                            {data.activeCampaigns.map(campaign => (
                                <div key={campaign.id} className="p-4 bg-white rounded-xl border border-orange-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-lg text-text-primary">{campaign.dishName}</h4>
                                            <p className="text-sm text-text-secondary">{campaign.restaurant}</p>
                                        </div>
                                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                                            {campaign.commissionRate} Comm.
                                        </span>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center text-sm">
                                        <span className="text-green-600 font-semibold">Earn: {campaign.potentialEarning}</span>
                                        <div className="flex gap-3 text-text-secondary">
                                            <span>{campaign.clicks} Clicks</span>
                                            <span>{campaign.conversions} Sales</span>
                                        </div>
                                    </div>
                                    <button className="mt-3 w-full border border-orange-300 text-orange-600 py-1.5 rounded-lg hover:bg-orange-50 font-medium transition-colors">
                                        Copy Affiliate Link
                                    </button>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>

                {/* AI Tools */}
                <div className="flex flex-col gap-6">
                    <CopyGeneratorCard />
                </div>
            </div>
        </div>
    );
};

const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
);

const PenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);

export default MarketerDashboard;
