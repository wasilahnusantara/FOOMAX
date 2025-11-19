
import React, { useState } from 'react';
import { generateOptimalRoute } from '../services/geminiService';
import type { Order } from '../types';
import DashboardCard from './DashboardCard';

interface RouteOptimizerCardProps {
    orders: Order[];
}

const RouteOptimizerCard: React.FC<RouteOptimizerCardProps> = ({ orders }) => {
    const [route, setRoute] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleOptimize = async () => {
        const addresses = orders
            .filter(o => o.status !== 'Delivered')
            .map(o => o.deliveryAddress);
            
        if (addresses.length < 2) {
            setError("You need at least two active deliveries to optimize a route.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setRoute(null);
        try {
            const generatedRoute = await generateOptimalRoute(addresses);
            setRoute(generatedRoute);
        } catch (err) {
            setError("Could not generate route. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                 <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-light"></div>
                     <p className="ml-3 text-text-secondary">Calculating route...</p>
                </div>
            )
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>
        }
        if (route) {
            return (
                <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                    {route.split('\n').map((step, index) => (
                        <li key={index}>{step.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                </ol>
            )
        }
        return (
            <div className="text-center">
                <p className="text-text-secondary mb-4">Get the most efficient route for your active deliveries.</p>
                 <button 
                    onClick={handleOptimize}
                    className="w-full bg-brand-green-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-700 disabled:text-gray-400 disabled:scale-100"
                    disabled={orders.filter(o => o.status !== 'Delivered').length < 2}
                >
                    Optimize Today's Route
                </button>
            </div>
        );
    }

    return (
        <DashboardCard title="AI Route Optimizer" icon={<MapIcon />}>
           {renderContent()}
        </DashboardCard>
    );
};

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10l6-3m0 0V7" /></svg>
);


export default RouteOptimizerCard;