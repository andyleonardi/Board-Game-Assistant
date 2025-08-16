
import React from 'react';
import { UploadIcon, LinkIcon, SparklesIcon, LoadingSpinnerIcon, DocumentIcon, XCircleIcon } from './icons';

interface InputAreaProps {
  onFileChange: (file: File | null) => void;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  pdfFile: File | null;
  youtubeUrl: string;
}

export const InputArea: React.FC<InputAreaProps> = ({
  onFileChange,
  onUrlChange,
  onGenerate,
  isLoading,
  pdfFile,
  youtubeUrl,
}) => {

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileChange(file);
    } else {
      onFileChange(null);
      // Maybe show an error to user
    }
  };
  
  const handleRemoveFile = () => {
      onFileChange(null);
      const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">Provide Rules Source</h2>
      <p className="text-slate-400 mb-6">Upload a rulebook PDF and/or provide a YouTube link.</p>
      
      <div className="space-y-4">
        {/* PDF Upload */}
        <div className="flex items-center gap-3">
            <UploadIcon className="w-5 h-5 text-slate-400" />
            <label htmlFor="pdf-upload" className="font-medium text-slate-300">Rulebook PDF</label>
        </div>
        {!pdfFile ? (
            <label htmlFor="pdf-upload" className="w-full flex justify-center items-center px-6 py-8 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer hover:border-cyan-400 hover:bg-slate-700/50 transition-colors">
                <div className="text-center">
                    <UploadIcon className="mx-auto h-10 w-10 text-slate-500"/>
                    <p className="mt-2 text-sm text-slate-400">
                        <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">PDF up to 10MB</p>
                </div>
                <input id="pdf-upload" name="pdf-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileSelect} />
            </label>
        ) : (
            <div className="w-full flex items-center justify-between px-4 py-3 bg-slate-700 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3 overflow-hidden">
                    <DocumentIcon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-200 truncate font-medium">{pdfFile.name}</span>
                </div>
                <button onClick={handleRemoveFile} className="p-1 text-slate-400 hover:text-white rounded-full transition-colors">
                    <XCircleIcon className="w-6 h-6" />
                </button>
            </div>
        )}
        
        {/* YouTube URL Input */}
        <div className="flex items-center gap-3 mt-4">
            <LinkIcon className="w-5 h-5 text-slate-400" />
            <label htmlFor="youtube-url" className="font-medium text-slate-300">YouTube URL</label>
        </div>
        <div className="relative">
          <input
            id="youtube-url"
            type="url"
            value={youtubeUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="e.g., https://www.youtube.com/watch?v=..."
            className="w-full bg-slate-700/80 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition"
            disabled={isLoading}
          />
        </div>
      </div>
      
      {/* Generate Button */}
      <div className="mt-8">
        <button
          onClick={onGenerate}
          disabled={isLoading || (!pdfFile && !youtubeUrl)}
          className="w-full flex items-center justify-center gap-3 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon className="w-5 h-5 animate-spin" />
              <span>Generating Note...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              <span>Generate Teach Note</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
