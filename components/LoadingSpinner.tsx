
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full border-4 border-brand-green-dark/20"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-brand-green-light animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-text-primary">Finding the perfect recipe...</p>
    </div>
  );
};

export default LoadingSpinner;