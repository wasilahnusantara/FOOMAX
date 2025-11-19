
import React from 'react';
import type { DashboardData } from '../types';
import DashboardCard from './DashboardCard';
import DishOfTheDayCard from './DishOfTheDayCard';

interface DashboardProps {
    data: DashboardData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
    return (
        <div className="w-full max-w-6xl animate-fade-in">
             <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6 text-center">Restaurant Dashboard</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                
                <DishOfTheDayCard trendingIngredients={data.trendingIngredients} />

                <DashboardCard title="Popular Dishes" icon={<TrendingUpIcon />}>
                    <ul className="space-y-3">
                        {data.popularDishes.map((dish, index) => (
                           <li key={index} className="flex items-center text-text-secondary border-b border-border-color pb-2 last:border-b-0">
                             <span className="text-brand-green-light font-bold mr-3 text-lg">{index + 1}.</span> 
                             {dish}
                           </li>
                        ))}
                    </ul>
                </DashboardCard>

                <div className="lg:col-span-2">
                    <DashboardCard title="Trending Ingredients" icon={<SparklesIcon />}>
                        <div className="flex flex-wrap gap-3">
                            {data.trendingIngredients.map((ingredient, index) => (
                                <span key={index} className="bg-brand-green-dark/50 text-brand-green-light px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-105">
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

export default Dashboard;