
import React from 'react';
import { BookOpenIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from './icons';

interface HeaderProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, onToggleSidebar }) => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                    >
                        {isSidebarOpen ? <ChevronDoubleLeftIcon className="w-6 h-6" /> : <ChevronDoubleRightIcon className="w-6 h-6" />}
                    </button>
                    <BookOpenIcon className="w-8 h-8 text-cyan-400" />
                    <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
                        Board Game Assistant
                    </h1>
                </div>
            </div>
        </header>
    );
};
