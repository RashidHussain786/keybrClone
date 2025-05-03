import React from 'react';
import { TextState } from '../../types';

interface TextDisplayProps extends Pick<TextState, 'text' | 'input' | 'cursorPosition'> {
    isCompleted?: boolean;
}

export const TextDisplay: React.FC<TextDisplayProps> = ({
    text,
    input,
    cursorPosition,
    isCompleted = false
}) => {
    // Split text into words for better layout
    const words = text.split(' ');

    // Track the current index in the original text
    let currentIndex = 0;

    return (
        <div className={`text-xl text-zinc-500 leading-relaxed tracking-wide flex flex-wrap ${isCompleted ? 'opacity-50' : ''}`}>
            {words.map((word, wordIndex) => {
                const wordWithSpace = wordIndex < words.length - 1 ? word + ' ' : word;
                const wordElement = (
                    <div
                        key={wordIndex}
                        className="flex mr-1 mb-1"
                    >
                        {wordWithSpace.split('').map((char, charIndex) => {
                            const charIndex_global = currentIndex;
                            currentIndex++;

                            // Determine character status
                            let status: 'pending' | 'correct' | 'incorrect' = 'pending';
                            if (charIndex_global < input.length) {
                                status = input[charIndex_global] === char ? 'correct' : 'incorrect';
                            }

                            // Determine if this is the current character (cursor position)
                            const isCurrent = charIndex_global === cursorPosition && !isCompleted;

                            // Style based on status and cursor position
                            let charStyle = "text-zinc-600"; // pending
                            if (status === 'correct') charStyle = "text-zinc-400";
                            if (status === 'incorrect') charStyle = "text-red-500";

                            return (
                                <span
                                    key={`${wordIndex}-${charIndex}`}
                                    className={`relative ${charStyle}`}
                                >
                                    {isCurrent && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-zinc-400 animate-pulse"></span>
                                    )}
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                );

                return wordElement;
            })}
        </div>
    );
}; 