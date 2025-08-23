
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, TeachNote, SavedGame, PDFInfo } from './types';
import { generateTeachNote, askChatbot, initializeChat } from './services/geminiService';
import { readFileAsBase64 } from './services/fileService';
import * as localStorageService from './services/localStorageService';
import { InputArea } from './components/InputArea';
import { TeachNoteDisplay } from './components/TeachNoteDisplay';
import { Chatbot } from './components/Chatbot';
import { Header } from './components/Header';
import { SavedGamesSidebar } from './components/SavedGamesSidebar';
import type { Chat } from '@google/genai';

export default function App() {
  // Global state
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Current session state (for new or loaded games)
  const [currentTeachNote, setCurrentTeachNote] = useState<TeachNote | null>(null);
  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>([]);
  const [currentPdfInfo, setCurrentPdfInfo] = useState<PDFInfo | null>(null);
  const [currentYoutubeUrl, setCurrentYoutubeUrl] = useState<string>('');
  
  // UI state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isChatting, setIsChatting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'new' | 'game'>('new');
  
  // Input state for 'new' view
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');

  const chatRef = useRef<Chat | null>(null);
  
  // Load saved games on initial render
  useEffect(() => {
    setSavedGames(localStorageService.getSavedGames());
  }, []);

  const resetToNew = () => {
    setView('new');
    setActiveGameId(null);
    setCurrentTeachNote(null);
    setCurrentChatMessages([]);
    setCurrentPdfInfo(null);
    setCurrentYoutubeUrl('');
    setPdfFile(null);
    setYoutubeUrl('');
    setError(null);
    chatRef.current = null;
  };

  const handleNewGame = () => {
    resetToNew();
  };

  const handleGenerate = useCallback(async () => {
    if (!pdfFile && !youtubeUrl) {
      setError('Please upload a PDF rulebook or provide a YouTube URL.');
      return;
    }
    
    resetToNew(); // Clear previous state before starting
    setIsGenerating(true);
    setIsSidebarOpen(true); // Ensure sidebar is open to show the new game later

    try {
      let pdfBase64 = '';
      let usedPdfInfo: PDFInfo | null = null;
      if (pdfFile) {
        pdfBase64 = await readFileAsBase64(pdfFile);
        usedPdfInfo = { name: pdfFile.name, base64: pdfBase64 };
      }
      
      const noteInput = {
        pdfBase64: pdfBase64,
        pdfFileName: pdfFile?.name || '',
        youtubeUrl: youtubeUrl
      };
      
      setCurrentPdfInfo(usedPdfInfo);
      setCurrentYoutubeUrl(youtubeUrl);
      
      const generatedNote = await generateTeachNote(noteInput.pdfBase64, noteInput.pdfFileName, noteInput.youtubeUrl);
      
      if (generatedNote) {
        setCurrentTeachNote(generatedNote);
        chatRef.current = initializeChat(generatedNote.gameName);
        const initialBotMessage: ChatMessage = {
          sender: 'bot',
          text: `Hello! I'm ready to answer your questions about the rules for **${generatedNote.gameName}**. My knowledge is based on the documents you provided and BoardGameGeek forums.`,
        };
        setCurrentChatMessages([initialBotMessage]);
        setView('game');
      } else {
        throw new Error('The generated content was empty or invalid.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the teach note.');
      setView('new'); // Go back to input screen on error
    } finally {
      setIsGenerating(false);
    }
  }, [pdfFile, youtubeUrl]);
  
  const handleSaveGame = () => {
    if (!currentTeachNote) return;

    const newGame: SavedGame = {
        id: activeGameId || Date.now().toString(),
        name: currentTeachNote.gameName,
        teachNote: currentTeachNote,
        chatMessages: currentChatMessages,
        pdfInfo: currentPdfInfo,
        youtubeUrl: currentYoutubeUrl,
    };
    
    localStorageService.saveGame(newGame);
    setSavedGames(localStorageService.getSavedGames()); // re-fetch and sort
    setActiveGameId(newGame.id);
  };

  const handleUpdateTeachNote = (updatedNote: TeachNote) => {
    setCurrentTeachNote(updatedNote);
    if (activeGameId) {
        const gameToUpdate = savedGames.find(g => g.id === activeGameId);
        if (gameToUpdate) {
            const updatedGame = {
                ...gameToUpdate,
                name: updatedNote.gameName,
                teachNote: updatedNote,
            };
            localStorageService.saveGame(updatedGame);
            setSavedGames(prev => {
                const newGames = prev.map(g => g.id === activeGameId ? updatedGame : g);
                // re-sort if name changed
                return newGames.sort((a, b) => a.name.localeCompare(b.name));
            });
        }
    }
  };


  const handleLoadGame = (id: string) => {
    const gameToLoad = savedGames.find(g => g.id === id);
    if (gameToLoad) {
      setActiveGameId(gameToLoad.id);
      setCurrentTeachNote(gameToLoad.teachNote);
      setCurrentChatMessages(gameToLoad.chatMessages);
      setCurrentPdfInfo(gameToLoad.pdfInfo);
      setCurrentYoutubeUrl(gameToLoad.youtubeUrl);
      chatRef.current = initializeChat(gameToLoad.name);
      setView('game');
      setError(null);
    }
  };

  const handleDeleteGame = (id: string) => {
      localStorageService.deleteGame(id);
      setSavedGames(prev => prev.filter(g => g.id !== id));
      if (activeGameId === id) {
          resetToNew();
      }
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatRef.current || isChatting) return;

    setError(null);
    setIsChatting(true);

    const userMessage: ChatMessage = { sender: 'user', text: message };
    const updatedMessages = [...currentChatMessages, userMessage];
    setCurrentChatMessages(updatedMessages);

    try {
      const botResponseText = await askChatbot(chatRef.current, currentTeachNote?.gameName || 'this game', message);
      const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
      const finalMessages = [...updatedMessages, botMessage];
      setCurrentChatMessages(finalMessages);

      // Auto-save chat history for saved games
      if (activeGameId) {
          const gameToUpdate = savedGames.find(g => g.id === activeGameId);
          if (gameToUpdate) {
              const updatedGame = { ...gameToUpdate, chatMessages: finalMessages };
              localStorageService.saveGame(updatedGame);
              setSavedGames(prev => prev.map(g => g.id === activeGameId ? updatedGame : g));
          }
      }

    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setCurrentChatMessages(prev => [...prev, errorMessage]);
      setError(err instanceof Error ? err.message : 'An unknown chat error occurred.');
    } finally {
      setIsChatting(false);
    }
  }, [isChatting, currentChatMessages, currentTeachNote, activeGameId, savedGames]);
  
  const activeGameIsUnsaved = view === 'game' && currentTeachNote && !savedGames.some(g => g.id === activeGameId);


  return (
    <div className="min-h-screen bg-slate-900 font-sans flex">
      <SavedGamesSidebar
        isSidebarOpen={isSidebarOpen}
        savedGames={savedGames}
        activeGameId={activeGameId}
        onLoadGame={handleLoadGame}
        onDeleteGame={handleDeleteGame}
        onNewGame={handleNewGame}
      />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-hidden">
          {view === 'new' && (
            <div className="max-w-2xl mx-auto">
                <InputArea
                  onFileChange={setPdfFile}
                  onUrlChange={setYoutubeUrl}
                  onGenerate={handleGenerate}
                  isLoading={isGenerating}
                  pdfFile={pdfFile}
                  youtubeUrl={youtubeUrl}
                />
            </div>
          )}
          
          {view === 'game' && currentTeachNote && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
              <div className="overflow-y-auto custom-scrollbar pr-2">
                 <TeachNoteDisplay 
                    teachNote={currentTeachNote} 
                    isLoading={false} 
                    onUpdateNote={handleUpdateTeachNote}
                    onSave={activeGameIsUnsaved ? handleSaveGame : undefined}
                />
              </div>
              
              <Chatbot
                messages={currentChatMessages}
                onSendMessage={handleSendMessage}
                isLoading={isChatting}
                isDisabled={!currentTeachNote}
              />
            </div>
          )}
          
          {error && (
            <div className="fixed bottom-4 right-4 max-w-md bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg shadow-lg z-20 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">Error</h3>
                  <p>{error}</p>
                </div>
                <button onClick={() => setError(null)} className="ml-4 p-1 text-red-300/50 hover:text-red-300 rounded-full">&times;</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
