
import React from 'react';
import { SavedGame } from '../types';
import { PlusIcon, TrashIcon, BookOpenIcon } from './icons';

interface SavedGamesSidebarProps {
    savedGames: SavedGame[];
    activeGameId: string | null;
    onLoadGame: (id: string) => void;
    onDeleteGame: (id: string) => void;
    onNewGame: () => void;
    isSidebarOpen: boolean;
}

export const SavedGamesSidebar: React.FC<SavedGamesSidebarProps> = ({
    savedGames,
    activeGameId,
    onLoadGame,
    onDeleteGame,
    onNewGame,
    isSidebarOpen,
}) => {
    return (
        <aside className={`bg-slate-800 flex flex-col h-screen sticky top-0 border-r border-slate-700 shrink-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
            <div className={`w-64 h-full flex flex-col transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="p-4 border-b border-slate-700">
                    <button
                        onClick={onNewGame}
                        className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200"
                    >
                        <PlusIcon className="w-5 h-5" />
                        New Game Teach
                    </button>
                </div>
                <nav className="flex-grow p-2 space-y-1 overflow-y-auto custom-scrollbar">
                    {savedGames.length > 0 ? (
                        savedGames.map((game) => (
                            <div key={game.id} className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${
                                activeGameId === game.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
                            }`}>
                                <div onClick={() => onLoadGame(game.id)} className="flex items-center gap-3 flex-grow overflow-hidden">
                                    <BookOpenIcon className={`w-5 h-5 flex-shrink-0 ${activeGameId === game.id ? 'text-cyan-400' : 'text-slate-400'}`}/>
                                    <span className="text-sm font-medium text-slate-200 truncate">{game.name}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if(window.confirm(`Are you sure you want to delete the teach for "${game.name}"?`)) {
                                            onDeleteGame(game.id)
                                        }
                                    }}
                                    className="p-1 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    aria-label={`Delete ${game.name}`}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-slate-500 p-4 text-sm">
                            No saved games yet.
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
};
