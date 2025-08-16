
import React from 'react';
import { BookOpenIcon } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-4">
                    <BookOpenIcon className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                        Board Game Assistant
                    </h1>
                </div>
            </div>
        </header>
    );
};
