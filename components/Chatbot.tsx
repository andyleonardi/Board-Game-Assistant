
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SendIcon, BotIcon, UserIcon, LoadingSpinnerIcon } from './icons';

interface ChatbotProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isBot = message.sender === 'bot';
    // A simple markdown to HTML converter for bold, italics, and links
    const formatText = (text: string) => {
        let formattedText = text
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italics
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Links with proper styling
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
            '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');

        return { __html: formattedText };
    };


    return (
        <div className={`flex items-start gap-3 ${isBot ? '' : 'justify-end'}`}>
            {isBot && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center"><BotIcon className="w-5 h-5 text-cyan-400" /></div>}
            <div 
              className={`max-w-md lg:max-w-lg rounded-xl px-4 py-3 prose prose-invert prose-p:my-0 prose-strong:text-white prose-a:text-cyan-400 hover:prose-a:underline ${isBot ? 'bg-slate-700 text-slate-200' : 'bg-cyan-600 text-white'}`}
              dangerouslySetInnerHTML={formatText(message.text)}
            >
            </div>
            {!isBot && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center"><UserIcon className="w-5 h-5 text-slate-200" /></div>}
        </div>
    );
};

export const Chatbot: React.FC<ChatbotProps> = ({ messages, onSendMessage, isLoading, isDisabled }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // A slight delay to ensure the DOM has updated before scrolling
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isDisabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className={`flex flex-col h-full bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-slate-100">Rules Chatbot</h2>
      </div>

      <div className="flex-grow p-4 space-y-4 overflow-y-auto custom-scrollbar">
        {isDisabled ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center">
            <BotIcon className="w-16 h-16 mb-4" />
            <p>Generate a teach note first to activate the chatbot.</p>
          </div>
        ) : (
            <>
                {messages.map((msg, index) => (
                    <ChatMessageBubble key={index} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex items-start gap-3 animate-fade-in">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center"><BotIcon className="w-5 h-5 text-cyan-400" /></div>
                        <div className="max-w-md lg:max-w-lg rounded-xl px-4 py-3 bg-slate-700 flex items-center gap-2">
                            <LoadingSpinnerIcon className="w-5 h-5 animate-spin text-slate-400"/>
                            <span className="text-slate-400">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </>
        )}
      </div>

      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isDisabled ? "Chat is disabled" : "Ask a rules question..."}
              disabled={isLoading || isDisabled}
              className="w-full bg-slate-700/80 border border-slate-600 rounded-lg pr-12 pl-4 py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || isDisabled || !input.trim()}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-slate-400 hover:text-cyan-400 disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
