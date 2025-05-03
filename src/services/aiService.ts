import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

/**
 * Generates typing practice content based on the provided topic
 * @param topic - The topic to generate content about
 * @returns A promise containing the generated text
 */
export async function generateTypingContent(topic: string): Promise<string> {
    if (!topic.trim()) {
        throw new Error('Topic cannot be empty');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a typing practice paragraph (50-100 words) about ${topic} that:
- Uses specific vocabulary and relevant terminology
- Maintains a natural and readable flow
- Includes common everyday words to support typing fluency
- Mixes short and long sentences for rhythm and variation
- Stays at an intermediate reading level suitable for most learners
- Avoids complex punctuation such as semicolons or em-dashes
- Uses proper grammar and correct sentence structure
- Focuses on interesting and factual content
- Avoids overly technical or advanced language
- Varies the phrasing and structure each time, even for the same topic`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate content');
    }
} 