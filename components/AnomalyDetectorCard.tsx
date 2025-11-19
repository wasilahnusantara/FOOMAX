
import React, { useState } from 'react';
import { detectAnomalies } from '../services/geminiService';
import type { LiveLog } from '../types';
import DashboardCard from './DashboardCard';

interface AnomalyDetectorCardProps {
    logs: LiveLog[];
}

const AnomalyDetectorCard: React.FC<AnomalyDetectorCardProps> = ({ logs }) => {
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleScan = async () => {
        if (logs.length === 0) {
            setError("No logs available to analyze.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const generatedAnalysis = await detectAnomalies(logs);
            setAnalysis(generatedAnalysis);
        } catch (err) {
            setError("Could not analyze logs. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                 <div className="flex items-center justify-center h-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green-light"></div>
                     <p className="ml-3 text-text-secondary">Scanning logs...</p>
                </div>
            )
        }
        if (error) {
            return <p className="text-red-400 text-center">{error}</p>
        }
        if (analysis) {
             const isNormal = analysis.toLowerCase().includes('normal');
            return (
                <div className={`p-3 rounded-lg border ${isNormal ? 'bg-green-900/30 border-green-500/50' : 'bg-yellow-900/30 border-yellow-500/50'}`}>
                    <ul className={`list-disc list-inside space-y-1 ${isNormal ? 'text-green-300' : 'text-yellow-300'}`}>
                        {analysis.split('\n').map((item, index) => (
                            <li key={index}>{item.replace(/^\s*-\s*/, '')}</li>
                        ))}
                    </ul>
                </div>
            )
        }
        return (
            <div className="text-center">
                <p className="text-text-secondary mb-4">Use AI to scan recent activity for potential issues.</p>
                 <button 
                    onClick={handleScan}
                    className="w-full bg-brand-green-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                >
                    Scan for Anomalies
                </button>
            </div>
        );
    }

    return (
        <DashboardCard title="AI Anomaly Detection" icon={<EyeIcon />}>
           {renderContent()}
        </DashboardCard>
    );
};

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);


export default AnomalyDetectorCard;
