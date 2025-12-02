
import React from 'react';

// LOGO FIXED: Updated with specific SVG code provided by user
const FoomaxLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="250" cy="220" r="160" stroke="#fcd64e" strokeWidth="20" fill="none" />
        <g transform="translate(0, -10)">
            <rect x="220" y="115" width="110" height="20" rx="10" fill="#1a7f64" />
            <path d="M185,115 L185,250 Q185,290 225,290 L260,290 A10,10 0 0,0 260,270 L225,270 Q205,270 205,250 L205,200 L185,200 Z" fill="#1a7f64" />
            <path d="M175,115 L175,180 Q175,200 195,200 L195,250 Q195,290 235,290 L235,290" fill="none" />
            <g fill="#1a7f64">
                <path d="M175,120 L175,170 Q175,185 185,185 L185,120 Z" />
                <path d="M190,120 L190,170 Q190,185 195,185 Q200,185 200,170 L200,120 Z" />
                <path d="M205,120 L205,170 Q205,185 210,185 Q215,185 215,170 L215,120 Z" />
                <path d="M195,180 L195,250 Q195,290 235,290 L265,290 A10,10 0 0,0 265,270 L235,270 Q215,270 215,250 L215,180 Z" />
            </g>
            <path d="M260,160 A50,50 0 1,1 260,260 A40,40 0 1,0 260,160 Z" fill="#fcd64e" transform="translate(15, 0)"/>
            <polygon points="300,175 306,190 322,190 310,200 314,215 300,205 286,215 290,200 278,190 294,190" fill="#fcd64e" transform="translate(5, -5)"/>
        </g>
        <text x="250" y="460" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="75px" fill="#1a7f64" textAnchor="middle">FOOMAX</text>
    </svg>
);

type ViewType = 'finder' | 'merchant' | 'marketer' | 'member' | 'admin' | 'territory' | 'runner';

interface HeaderProps {
    view: string;
    setView: (view: ViewType) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, onLogout }) => {

  const buttonClass = (buttonView: ViewType) => 
    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-green-light focus:ring-opacity-50 ${
        view === buttonView 
        ? 'bg-brand-green-dark text-white shadow-lg border border-brand-green-light' 
        : 'text-brand-green-text hover:text-brand-green-dark hover:bg-orange-100'
    }`;
    
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b-2 border-brand-green-light w-full sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
         {/* Spacer Left */}
         <div className="flex-1"></div>
         
         {/* Logo Center */}
         <div className="flex flex-col items-center cursor-pointer group" onClick={() => setView('finder')}>
            <div className="transform transition-transform group-hover:scale-105 duration-300">
                <FoomaxLogoIcon className="h-20 w-auto md:h-24" />
            </div>
            {/* Removed duplicate HTML text as SVG now contains FOOMAX text */}
            <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-brand-green-light uppercase -mt-2">
            Halal & Syar'i
            </p>
         </div>

         {/* Logout Button Right */}
         <div className="flex-1 flex justify-end">
            <button 
                onClick={onLogout}
                className="text-sm font-bold text-brand-green-dark hover:text-red-600 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
            >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            </button>
         </div>
      </div>

      <nav className="container mx-auto flex justify-center pb-3 px-2 overflow-x-auto no-scrollbar">
        <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-orange-50/80 rounded-xl border border-brand-green-light/30 min-w-max shadow-inner">
            <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={() => setView('finder')} className={buttonClass('finder')}>Recipe Finder</button>
                <button onClick={() => setView('member')} className={buttonClass('member')}>Member</button>
                <button onClick={() => setView('merchant')} className={buttonClass('merchant')}>Merchant</button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
                 <button onClick={() => setView('marketer')} className={buttonClass('marketer')}>Marketer</button>
                <button onClick={() => setView('runner')} className={buttonClass('runner')}>Runner</button>
                 <button onClick={() => setView('admin')} className={buttonClass('admin')}>Admin</button>
                <button onClick={() => setView('territory')} className={buttonClass('territory')}>Territory</button>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
