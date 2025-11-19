
import React from 'react';

const FoomaxLogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-auto md:h-16" viewBox="0 0 105 60" fill="none">
        {/* The main green color is now applied via a parent class */}
        <g className="fill-current">
            {/* Speed Lines */}
            <path d="M26.34 23.95H3.66a2.66 2.66 0 1 1 0-5.32h22.68a2.66 2.66 0 1 1 0 5.32z"/>
            <path d="M35.66 32.27H.98a2.66 2.66 0 1 1 0-5.32h34.68a2.66 2.66 0 1 1 0 5.32z"/>
            <path d="M29.67 40.58H8.33a2.66 2.66 0 0 1 0-5.31h21.34a2.66 2.66 0 0 1 0 5.31z"/>
            {/* Cloche Base */}
            <path d="M40.64 57.34c-1.47 0-2.66-1.19-2.66-2.66v-3.3c0-1.47 1.19-2.66 2.66-2.66h23.72c1.47 0 2.66 1.19 2.66 2.66v3.3c0 1.47-1.19 2.66-2.66 2.66H40.64z"/>
            <path d="M85.9 52.34H69.58c-3.1 0-5.62-2.52-5.62-5.62V45.9c0-.4-.33-.73-.73-.73h-7.86c-.4 0-.73.33-.73.73v.82c0 3.1-2.52 5.62-5.62 5.62H34.1c-1.47 0-2.66-1.19-2.66-2.66s1.19-2.66 2.66-2.66h9.54c.73 0 1.33-.6 1.33-1.33s-.6-1.33-1.33-1.33H33.37c-1.47 0-2.66-1.19-2.66-2.66s1.19-2.66 2.66-2.66h53.26c1.47 0 2.66 1.19 2.66 2.66s-1.19 2.66-2.66 2.66h-.97c-.73 0-1.33.6-1.33 1.33s.6 1.33 1.33 1.33h1.7c1.47 0 2.66 1.19 2.66 2.66s-1.19 2.66-2.66 2.66z"/>
            {/* Cloche Lid */}
            <path d="M96.42 41.24c-1.43-1.9-3.08-3.66-4.93-5.26-12.8-10.99-30.8-12.1-45.18-3.32-4.52 2.76-8.4 6.6-11.45 11.24H96.42z"/>
            {/* Cloche Handle */}
            <path d="M72.24 10.97c0-2.31-1.87-4.18-4.18-4.18s-4.18 1.87-4.18 4.18c0 1.86 1.22 3.44 2.89 3.96a2.66 2.66 0 0 1-2.22 2.6c-2.8.54-4.5 3.19-4.5 6.07 0 1.47 1.19 2.66 2.66 2.66h10.7c1.47 0 2.66-1.19 2.66-2.66 0-2.88-1.7-5.53-4.5-6.07a2.66 2.66 0 0 1-2.22-2.6c1.67-.52 2.89-2.1 2.89-3.96z"/>
        </g>
        {/* Light Green Accent */}
        <path fill="#a3d46a" d="M47.85 20.32c12.23-7.53 28.5-6.73 39.8 2.22-2.12-3.16-4.8-5.93-7.92-8.2-12.81-11-30.8-12.1-45.19-3.32-2.73 1.66-5.21 3.73-7.36 6.12 6.84-4.8 15.3-5.7 20.67-3.18z"/>
    </svg>
);

type ViewType = 'finder' | 'dashboard' | 'runner' | 'member' | 'admin' | 'watcher';

interface HeaderProps {
    view: ViewType;
    setView: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView }) => {

  const buttonClass = (buttonView: ViewType) => 
    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-opacity-50 ${
        view === buttonView 
        ? 'bg-brand-green-dark text-white shadow-lg' 
        : 'text-text-secondary hover:text-text-primary hover:bg-white/10'
    }`;
    
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border-color w-full sticky top-0 z-10">
      <div className="container mx-auto flex flex-col items-center justify-center py-4 text-brand-green-dark">
        <FoomaxLogoIcon />
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-green-text tracking-tighter mt-1">
          FOOMAX
        </h1>
        <p className="text-sm md:text-base font-semibold tracking-widest text-brand-green-dark">
          HALAL & SYAR'I
        </p>
      </div>
      <nav className="container mx-auto flex justify-center pb-4 px-2">
        <div className="flex flex-col items-center gap-2 p-2 bg-black/20 rounded-xl">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setView('finder')}
                    className={buttonClass('finder')}
                >
                    Recipe Finder
                </button>
                <button
                    onClick={() => setView('member')}
                    className={buttonClass('member')}
                >
                    Member
                </button>
                <button 
                    onClick={() => setView('dashboard')}
                    className={buttonClass('dashboard')}
                >
                    Restaurant
                </button>
            </div>
            <div className="flex items-center gap-2">
                 <button
                    onClick={() => setView('runner')}
                    className={buttonClass('runner')}
                >
                    Runner
                </button>
                 <button
                    onClick={() => setView('admin')}
                    className={buttonClass('admin')}
                >
                    Admin
                </button>
                <button
                    onClick={() => setView('watcher')}
                    className={buttonClass('watcher')}
                >
                    Watcher
                </button>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;