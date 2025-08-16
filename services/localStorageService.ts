
import { SavedGame } from '../types';

const STORAGE_KEY = 'boardGameAssistantSaves';

export const getSavedGames = (): SavedGame[] => {
    try {
        const savedGamesJSON = localStorage.getItem(STORAGE_KEY);
        if (savedGamesJSON) {
            // Sort by game name alphabetically
            const games = JSON.parse(savedGamesJSON) as SavedGame[];
            return games.sort((a, b) => a.name.localeCompare(b.name));
        }
    } catch (error) {
        console.error("Failed to load games from localStorage", error);
    }
    return [];
};

export const saveGame = (gameToSave: SavedGame): SavedGame => {
    const games = getSavedGames();
    const existingIndex = games.findIndex(g => g.id === gameToSave.id);

    // Create a storage-safe version of the game by removing the large base64 data
    const gameForStorage: SavedGame = {
        ...gameToSave,
        // If pdfInfo exists, keep the name but clear the base64 data to avoid storage quota issues
        pdfInfo: gameToSave.pdfInfo ? { name: gameToSave.pdfInfo.name, base64: '' } : null,
    };


    if (existingIndex > -1) {
        games[existingIndex] = gameForStorage;
    } else {
        games.push(gameForStorage);
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    } catch (error) {
        console.error("Failed to save game to localStorage", error);
    }
    
    // Return the original game object to keep the base64 data in the current session's state if needed
    return gameToSave;
};

export const deleteGame = (gameId: string): void => {
    let games = getSavedGames();
    games = games.filter(g => g.id !== gameId);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    } catch (error) {
        console.error("Failed to delete game from localStorage", error);
    }
};
