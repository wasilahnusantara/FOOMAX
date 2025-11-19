
import React, { useState, useEffect } from 'react';
import { generateMemberRecommendations } from '../services/geminiService';
import type { MemberOrderHistory } from '../types';
import DashboardCard from './DashboardCard';

interface RecommendationsCardProps {
    orderHistory: MemberOrderHistory[];
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ orderHistory }) => {
    const [recommendations, setRecommendations] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (orderHistory.length === 0) {
                setIsLoading(false);
                setRecommendations("No orders yet to generate recommendations!");
                return;
            };

            setIsLoading(true);
            setError(null);
            try {
                const history = orderHistory.map(o => o.dishName);
                const generatedRecs = await generateMemberRecommendations(history);
                setRecommendations(generatedRecs);
            } catch (err) {
                setError("Could not get recommendations. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [orderHistory]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-light"></div>
                     <p className="ml-3 text-text-secondary">Finding new dishes...</p>
                </div>
            )
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>
        }
        if (recommendations) {
            return (
                <ul className="space-y-3">
                    {recommendations.split('\n').map((rec, index) => {
                         const [title, ...descriptionParts] = rec.replace(/^\d+\.\s*/, '').split(' - ');
                         const description = descriptionParts.join(' - ');
                        return (
                             <li key={index}>
                                <h4 className="font-bold text-text-primary">{title}</h4>
                                <p className="text-sm text-text-secondary">{description}</p>
                            </li>
                        )
                    })}
                </ul>
            );
        }
        return <p className="text-text-secondary">No recommendations available right now.</p>
    }

    return (
        <DashboardCard title="Just For You" icon={<GiftIcon />}>
           {renderContent()}
        </DashboardCard>
    );
};

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);


export default RecommendationsCard;