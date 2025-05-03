import React, { useRef, useEffect } from 'react';
import { TextDisplay } from './TextDisplay';
import { Keyboard } from './Keyboard';
import { MetricsPanel } from '../metrics/MetricsPanel';
import { SideNav } from '../layout/SideNav';
import { Footer } from '../layout/Footer';
import { UserInfo } from '../layout/UserInfo';
import { useTypingTest } from '../../hooks/useTypingTest';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useTopicSuggestions } from '../../hooks/useTopicSuggestions';
import { useContentGenerator } from '../../hooks/useContentGenerator';
import { KEYBOARD_LETTERS } from '../../utils/constants';

export const TypingTest: React.FC = () => {
    const {
        text,
        input,
        cursorPosition,
        isCompleted,
        isGenerating,
        wpm,
        accuracy,
        score,
        lastSpeed,
        topSpeed,
        dailyGoal,
        dailyProgress,
        setText,
        resetTest,
        handleKeyPress,
        handleBackspace,
        setGenerating,
    } = useTypingTest();

    const {
        topic,
        filteredSuggestions,
        showSuggestions,
        suggestionsRef,
        handleTopicChange,
        handleSuggestionClick,
        showSuggestionsDropdown,
        resetTopic
    } = useTopicSuggestions();

    const {
        generateContent,
        isGenerating: isGeneratingContent
    } = useContentGenerator((generatedText) => {
        setText(generatedText);
        resetTest();
        resetTopic();
    });

    const {
        pressedKeys,
        currentKey
    } = useKeyboard(
        handleKeyPress,
        handleBackspace,
        !isCompleted && !isGenerating
    );

    const containerRef = useRef<HTMLDivElement>(null);

    // Sets the generating state in the typing test hook when content is being generated
    useEffect(() => {
        setGenerating(isGeneratingContent);
    }, [isGeneratingContent, setGenerating]);

    // Handler for the generate button
    const handleGenerateContent = async () => {
        if (topic.trim()) {
            await generateContent(topic);
        }
    };

    // Handle Enter key press in the topic input field
    const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isGeneratingContent && topic.trim()) {
            e.preventDefault();
            handleGenerateContent();
        }
    };

    return (
        <div
            className="flex-1 flex flex-col items-center justify-between py-4 px-6 relative"
            ref={containerRef}
        >
            <div className="w-full max-w-screen-xl flex relative">
                <div className="w-3/4">
                    <div className="mb-4 flex items-center relative">
                        <div className="relative w-64">
                            <input
                                type="text"
                                value={topic}
                                onChange={handleTopicChange}
                                onFocus={showSuggestionsDropdown}
                                onKeyDown={handleTopicKeyDown}
                                placeholder="Enter a topic for typing practice..."
                                className="w-full px-3 py-2 bg-zinc-800 text-zinc-300 rounded border border-zinc-700 focus:outline-none focus:border-zinc-500 topic-input"
                                aria-label="Topic input, press Enter to generate content"
                            />
                            {topic.trim() && (
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500">
                                    Press Enter ↵
                                </span>
                            )}

                            {/* Suggestions dropdown */}
                            {showSuggestions && filteredSuggestions.length > 0 && (
                                <div
                                    ref={suggestionsRef}
                                    className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded shadow-lg max-h-60 overflow-y-auto"
                                >
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-3 py-2 hover:bg-zinc-700 cursor-pointer text-zinc-300"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleGenerateContent}
                            disabled={isGeneratingContent}
                            className={`ml-2 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors relative ${isGeneratingContent ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {isGeneratingContent ? 'Generating...' : 'Generate'}
                            <span className="absolute -top-2 -right-2 bg-green-500 text-xs text-white px-1 py-0.5 rounded-full font-bold">
                                NEW
                            </span>
                        </button>

                        {isCompleted && (
                            <button
                                onClick={resetTest}
                                className="ml-2 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors"
                            >
                                Try Again
                            </button>
                        )}
                    </div>

                    <MetricsPanel
                        wpm={wpm}
                        accuracy={accuracy}
                        score={score}
                        allKeys={KEYBOARD_LETTERS}
                        currentKey={currentKey}
                        lastSpeed={lastSpeed}
                        topSpeed={topSpeed}
                        dailyGoal={dailyGoal}
                        dailyProgress={dailyProgress}
                    />

                    <div className="mt-12 mb-16 relative">
                        <TextDisplay
                            text={text}
                            input={input}
                            cursorPosition={cursorPosition}
                            isCompleted={isCompleted}
                        />

                        {/* Overlay message when completed */}
                        {isCompleted && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96 max-w-full text-center animate-fade-in">
                                    <div className="text-yellow-400 text-3xl font-bold mb-4">
                                        Test Completed! 🎉
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-zinc-700 p-3 rounded">
                                            <div className="text-zinc-400 text-sm">Speed</div>
                                            <div className="text-xl font-bold">{wpm.toFixed(1)} WPM</div>
                                        </div>
                                        <div className="bg-zinc-700 p-3 rounded">
                                            <div className="text-zinc-400 text-sm">Accuracy</div>
                                            <div className="text-xl font-bold">{accuracy.toFixed(1)}%</div>
                                        </div>
                                        <div className="bg-zinc-700 p-3 rounded">
                                            <div className="text-zinc-400 text-sm">Score</div>
                                            <div className="text-xl font-bold">{score}</div>
                                        </div>
                                        <div className="bg-zinc-700 p-3 rounded">
                                            <div className="text-zinc-400 text-sm">Top Speed</div>
                                            <div className="text-xl font-bold">{topSpeed.toFixed(1)} WPM</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetTest}
                                        className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors w-full"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-8 flex justify-center">
                        <Keyboard pressedKeys={pressedKeys} currentKey={currentKey} />
                    </div>
                </div>

                <div className="fixed right-0 top-0 h-full flex items-center pr-8">
                    <div>
                        <UserInfo />
                        <SideNav />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}; 