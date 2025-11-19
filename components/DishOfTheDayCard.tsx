
import React, { useState, useEffect } from 'react';
import { generateDishOfTheDay } from '../services/geminiService';
import DashboardCard from './DashboardCard';

interface DishOfTheDayCardProps {
    trendingIngredients: string[];
}

const DishOfTheDayCard: React.FC<DishOfTheDayCardProps> = ({ trendingIngredients }) => {
    const [dish, setDish] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDish = async () => {
            if (trendingIngredients.length === 0) {
                setIsLoading(false);
                return;
            };
            setIsLoading(true);
            setError(null);
            try {
                const generatedDish = await generateDishOfTheDay(trendingIngredients);
                setDish(generatedDish);
            } catch (err) {
                setError("Could not generate a suggestion. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDish();
    }, [trendingIngredients]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-light"></div>
                     <p className="ml-3 text-text-secondary">Thinking...</p>
                </div>
            )
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>
        }
        if (dish) {
            const [title, ...descriptionParts] = dish.split(':');
            const description = descriptionParts.join(':').trim();
            return (
                <div>
                    <h4 className="text-lg font-bold text-brand-green-light">{title}</h4>
                    <p className="text-text-secondary mt-1">{description}</p>
                </div>
            );
        }
        return <p className="text-text-secondary">No suggestion available right now.</p>
    }

    return (
        <DashboardCard title="AI Dish of the Day" icon={<StarIcon />}>
           {renderContent()}
        </DashboardCard>
    );
};

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11.73 9 11 6.82 8.82 6l2.18-1.09L12 3m-1 15l-1.09-2.18L8.82 15l2.18-1.09L12 11.73l.27 2.18 2.18 1.09-2.18 1.09L12 18m9-11l1.09 2.18L24 10l-2.18 1.09L20.73 13 20 10.82 17.82 10l2.18-1.09L21 7z" />
    </svg>
);


export default DishOfTheDayCard;