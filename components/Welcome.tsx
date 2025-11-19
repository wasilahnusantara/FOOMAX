
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="text-center p-8 bg-card/50 rounded-2xl shadow-lg animate-fade-in border border-border-color">
        <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-brand-green-dark/20 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-green-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l1.09 2.18L15 6l-2.18 1.09L11.73 9 11 6.82 8.82 6l2.18-1.09L12 3m-1 15l-1.09-2.18L8.82 15l2.18-1.09L12 11.73l.27 2.18 2.18 1.09-2.18 1.09L12 18m9-11l1.09 2.18L24 10l-2.18 1.09L20.73 13 20 10.82 17.82 10l2.18-1.09L21 7z" />
                </svg>
            </div>
        </div>
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
        What Halal dish are you craving today?
      </h2>
      <p className="mt-2 text-text-secondary max-w-md mx-auto">
        Just type in a dish or an ingredient above, and let our AI chef whip up a delightful Halal recipe for you.
      </p>
    </div>
  );
};

export default Welcome;