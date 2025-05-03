import { useCallback, useState } from 'react';
import { generateTypingContent } from '../services/aiService';

export function useContentGenerator(onContentGenerated: (text: string) => void) {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    /**
     * Generates typing content based on the provided topic
     */
    const generateContent = useCallback(async (topic: string) => {
        if (!topic.trim()) return;

        try {
            setIsGenerating(true);
            const generatedText = await generateTypingContent(topic);
            onContentGenerated(generatedText);
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setIsGenerating(false);
        }
    }, [onContentGenerated]);

    return {
        isGenerating,
        generateContent
    };
} 