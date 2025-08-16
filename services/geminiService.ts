
import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { TeachNote } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const teachNoteSchema = {
    type: Type.OBJECT,
    properties: {
        gameName: { type: Type.STRING, description: "The name of the board game." },
        theme: { type: Type.STRING, description: "A brief description of the game's theme, in 2 sentences max." },
        gameplay: { type: Type.STRING, description: "A brief description of the gameplay loop and objective, in 3-4 sentences." },
        roundStructure: { type: Type.STRING, description: "An explanation of what happens in a typical game round." },
        playerTurn: { type: Type.STRING, description: "The structure of a single player's turn." },
        actions: {
            type: Type.ARRAY,
            description: "Optional. A summary of all actions a player can take (main actions and including any free actions or anytime actions). Provide at most 2 bullet points per action.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "The name of the action." },
                    description: { type: Type.STRING, description: "A brief description of the action." }
                },
                required: ["name", "description"]
            }
        },
        endGame: { type: Type.STRING, description: "How the game ends or the end-game trigger conditions." },
        scoring: {
            type: Type.ARRAY,
            description: "Optional. A summary of how points are scored if it's a point-based game.",
            items: { type: Type.STRING }
        },
        otherConcepts: {
            type: Type.ARRAY,
            description: "A summary of other important or unique concepts in the game.",
            items: { type: Type.STRING }
        }
    },
    required: ["gameName", "theme", "gameplay", "roundStructure", "playerTurn", "endGame"]
};


export const generateTeachNote = async (pdfBase64: string, pdfFileName: string, youtubeUrl: string): Promise<TeachNote | null> => {
    const model = 'gemini-2.5-flash';

    const prompt = `
    You are a board game expert specializing in teaching games.
    Based on the provided rulebook PDF and/or YouTube video link, generate a concise teach note.
    First, identify the name of the game. Then, provide the teach note in the specified JSON format.
    Do not include any text outside of the JSON object.
    The output must strictly follow the provided JSON schema.
    If a YouTube URL is provided, analyze its content (title, description, and transcript if available) to extract rules information.
    If a PDF is provided, prioritize its content for accuracy.
    ${youtubeUrl ? `YouTube Video URL: ${youtubeUrl}` : ''}
    ${pdfFileName ? `Rulebook Filename: ${pdfFileName}`: ''}
    `;

    const contents = [];
    contents.push({ text: prompt });

    if (pdfBase64) {
        contents.push({
            inlineData: {
                mimeType: 'application/pdf',
                data: pdfBase64,
            },
        });
    }

    const response = await ai.models.generateContent({
        model,
        contents: [{ parts: contents }],
        config: {
            responseMimeType: "application/json",
            responseSchema: teachNoteSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as TeachNote;
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("Could not generate a valid teach note. The AI's response was not in the expected format.");
    }
};

export const initializeChat = (gameName: string): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are a helpful and an accurate board game rules assistant for the game "${gameName}". 
            Your knowledge is strictly limited to the provided rulebook content and information from BoardGameGeek (boardgamegeek.com) forums for "${gameName}".
            When you use BoardGameGeek, you MUST cite the source URL from the grounding chunks.
            If the answer cannot be found in these sources, you must respond with "I cannot find the answer in the provided context or on BoardGameGeek forums."
            Format your answers clearly using markdown.`,
            tools: [{ googleSearch: {} }]
        },
    });
};


export const askChatbot = async (chat: Chat, gameName: string, userQuestion: string): Promise<string> => {
    const prompt = `Using your knowledge from the provided context and by searching BoardGameGeek (boardgamegeek.com) forums for "${gameName}", answer the following question: "${userQuestion}"`;

    const response: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    
    let responseText = response.text;
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    // Define an interface for the structure of a web source. Title can be optional.
    interface WebSource {
        uri: string;
        title?: string;
    }

    if (groundingChunks && groundingChunks.length > 0) {
        // Cast chunks to a known type to safely access properties and filter them.
        const sources = (groundingChunks as { web: WebSource }[])
            .map(chunk => chunk.web)
            .filter((web): web is WebSource => !!web?.uri); // Type guard ensures we have valid WebSource objects.

        if(sources.length > 0) {
            // Using a Map to get unique sources by URI
            const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());
            
            responseText += '\n\n**Sources:**\n';
            uniqueSources.forEach(source => {
                // Now `source` is properly typed as WebSource
                responseText += `- [${source.title || source.uri}](${source.uri})\n`;
            });
        }
    }

    return responseText;
};
