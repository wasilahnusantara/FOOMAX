
import React, { useState, useEffect } from 'react';
import { generateAdminInsights } from '../services/geminiService';
import type { DashboardData, RunnerStats } from '../types';
import DashboardCard from './DashboardCard';

interface AdminInsightsCardProps {
    popularDishes: DashboardData['popularDishes'];
    runnerStats: RunnerStats;
}

const AdminInsightsCard: React.FC<AdminInsightsCardProps> = ({ popularDishes, runnerStats }) => {
    const [insight, setInsight] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInsight = async () => {
            if (!popularDishes || !runnerStats) {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            setError(null);
            try {
                const generatedInsight = await generateAdminInsights(popularDishes, runnerStats);
                setInsight(generatedInsight);
            } catch (err) {
                setError("Could not generate insight. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInsight();
    }, [popularDishes, runnerStats]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-light"></div>
                     <p className="ml-3 text-text-secondary">Analyzing data...</p>
                </div>
            )
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>
        }
        if (insight) {
            return (
                <p className="text-text-secondary leading-relaxed">{insight}</p>
            );
        }
        return <p className="text-text-secondary">No insights available right now.</p>
    }

    return (
        <DashboardCard title="AI Business Insight" icon={<BrainIcon />}>
           {renderContent()}
        </DashboardCard>
    );
};

const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L5 6.82v4L12 15l7-4.18v-4L12 3z" />
    </svg>
);


export default AdminInsightsCard;