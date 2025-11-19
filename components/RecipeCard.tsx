
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const InfoPill: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-2 bg-brand-green-dark/20 text-brand-green-light px-3 py-1 rounded-full text-sm font-medium">
        {icon}
        <span>{text}</span>
    </div>
);

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in border border-border-color">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">{recipe.recipeName}</h2>
      <p className="text-text-secondary mb-6">{recipe.description}</p>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <InfoPill icon={<ClockIcon />} text={recipe.prepTime} />
        <InfoPill icon={<FireIcon />} text={recipe.cookTime} />
        <InfoPill icon={<UsersIcon />} text={recipe.servings} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold text-brand-green-light mb-4 border-b-2 border-brand-green-dark/50 pb-2">Ingredients</h3>
          <ul className="space-y-2 list-disc list-inside text-text-secondary">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-brand-green-light mb-4 border-b-2 border-brand-green-dark/50 pb-2">Instructions</h3>
          <ol className="space-y-4 text-text-secondary">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-3 flex-shrink-0 h-8 w-8 rounded-full bg-brand-green-dark text-white flex items-center justify-center font-bold text-sm">{index + 1}</span>
                <p className="flex-1 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

// SVG Icons
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
);
const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.76-.36 3.6 0 3.6 1.84 0 1.43-1.28 2.57-2.92 2.57-1.1 0-1.97-.63-2.28-1.55-.29.6-.42.93-.42 1.48 0 1.2.94 2.14 2.14 2.14.93 0 1.69-.63 1.96-1.46.22.46.36.93.36 1.42 0 1.27-.93 2.2-2.1 2.2z"/></svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.558 5.422a.5.5 0 01.002.001l-.002.001a4.5 4.5 0 00-6.884 0l-.002-.001a.5.5 0 01.002-.001A5.5 5.5 0 019 11.558zM12 6a3 3 0 11-6 0 3 3 0 016 0zm2.5 5.422a.5.5 0 01.002.001l-.002.001a4.5 4.5 0 00-6.884 0l-.002-.001a.5.5 0 01.002-.001A5.5 5.5 0 0114.5 11.558z" /></svg>
);


export default RecipeCard;