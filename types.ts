
export interface TeachNote {
  gameName: string;
  theme: string;
  gameplay: string;
  roundStructure: string;
  playerTurn: string;
  actions: ActionSummary[];
  endGame: string;
  scoring: string[];
  otherConcepts: string[];
}

export interface ActionSummary {
  name: string;
  description:string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface PDFInfo {
  name: string;
  base64: string;
}

export interface SavedGame {
  id: string; // Using Date.now().toString()
  name: string; // From teachNote.gameName
  teachNote: TeachNote;
  chatMessages: ChatMessage[];
  pdfInfo: PDFInfo | null;
  youtubeUrl: string;
}
