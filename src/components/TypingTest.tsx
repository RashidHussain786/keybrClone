import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Keyboard } from './Keyboard';
import { MetricsPanel } from './MetricsPanel';
import { TextDisplay } from './TextDisplay';
import { UserInfo } from './UserInfo';
import { SideNav } from './SideNav';
import { Footer } from './Footer';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Sample suggestions for topics (you can expand this list)
const topicSuggestions = [
    'Space exploration', 'Artificial intelligence', 'Climate change',
    'Renewable energy', 'Ocean conservation', 'Quantum computing',
    'Sustainable agriculture', 'Virtual reality', 'Blockchain technology',
    'Ancient civilizations', 'Wildlife conservation', 'Neuroscience',
    'Robotics', 'Astronomy', 'Biodiversity', 'Cybersecurity'
];

export const TypingTest: React.FC = () => {
    const [text, setText] = useState<string>(
        'Welcome to your typing practice. You can generate your own custom paragraph on any topic you like, such as space exploration, artificial intelligence, climate change, renewable energy, or quantum computing. This is a sample text to help you get started. Try to maintain accuracy and speed as you type.'
    );
    const [input, setInput] = useState<string>('');
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [lastSpeed, setLastSpeed] = useState<number>(0);
    const [topSpeed, setTopSpeed] = useState<number>(0);
    const [currentKey, setCurrentKey] = useState<string>('');
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [dailyGoal, setDailyGoal] = useState<number>(30);
    const [dailyProgress, setDailyProgress] = useState<number>(0);
    const [topic, setTopic] = useState<string>('');
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (topic.trim() === '') {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = topicSuggestions.filter(
            suggestion => suggestion.toLowerCase().includes(topic.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    }, [topic]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).classList.contains('topic-input')
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const generateTypingContent = async (topicValue: string) => {
        if (!topicValue.trim()) return;

        try {
            setIsGenerating(true);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Generate a typing practice paragraph (50-100 words) about ${topicValue} that:
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

            const result = await model.generateContent(prompt);
            const response = await result.response;
            setText(response.text());
            resetTest();

            // Clear the topic input after generating content
            setTopic('');
            setShowSuggestions(false);

        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const resetTest = () => {
        setInput('');
        setCursorPosition(0);
        setStartTime(null);
        setWpm(0);
        setAccuracy(0);
        setScore(0);
        setIsCompleted(false);
    };

    // Handle global keydown events
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (isCompleted || isGenerating) return;

            // Prevent handling if we're typing in the topic input field
            if (document.activeElement?.tagName === 'INPUT' &&
                (document.activeElement as HTMLElement).getAttribute('placeholder')?.includes('topic')) {
                return;
            }

            if (!startTime) {
                setStartTime(Date.now());
            }

            if (e.key === 'Tab' || e.key === 'Enter') {
                e.preventDefault();
            }

            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.add(e.key.toUpperCase());
                return newSet;
            });

            setCurrentKey(e.key.toUpperCase());

            if (e.key === 'Backspace') {
                if (cursorPosition > 0) {
                    setInput(prev => prev.substring(0, prev.length - 1));
                    setCursorPosition(prev => prev - 1);
                }
                e.preventDefault();
            } else if (e.key.length === 1) {
                const newInput = input + e.key;
                setInput(newInput);
                setCursorPosition(prev => prev + 1);
                updateMetrics(newInput);

                if (newInput.length === text.length) {
                    completeTest(newInput);
                }
                e.preventDefault();
            }
        };

        const handleGlobalKeyUp = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(e.key.toUpperCase());
                return newSet;
            });
        };

        // Add global event listeners
        window.addEventListener('keydown', handleGlobalKeyDown);
        window.addEventListener('keyup', handleGlobalKeyUp);

        // Clean up
        return () => {
            window.removeEventListener('keydown', handleGlobalKeyDown);
            window.removeEventListener('keyup', handleGlobalKeyUp);
        };
    }, [input, cursorPosition, text, startTime, isCompleted, isGenerating]);

    const updateMetrics = (currentInput: string) => {
        if (!startTime || isCompleted) return;

        const timeElapsed = (Date.now() - startTime) / 60000;
        const wordsTyped = currentInput.length / 5;
        const currentWpm = timeElapsed > 0 ? wordsTyped / timeElapsed : 0;

        let correctChars = 0;
        for (let i = 0; i < currentInput.length; i++) {
            if (i < text.length && currentInput[i] === text[i]) {
                correctChars++;
            }
        }

        const currentAccuracy = currentInput.length > 0 ? (correctChars / currentInput.length) * 100 : 0;

        setWpm(prev => Math.round((prev * 0.9 + currentWpm * 0.1) * 10) / 10);
        setAccuracy(prev => Math.round((prev * 0.9 + currentAccuracy * 0.1) * 10) / 10);
        setScore(Math.round(currentWpm * currentAccuracy));
        setDailyProgress(prev => Math.min(prev + 0.01, dailyGoal));

        if (currentWpm > topSpeed) {
            setTopSpeed(Math.round(currentWpm * 10) / 10);
        }

        setLastSpeed(Math.round(currentWpm * 10) / 10);
    };

    const completeTest = (finalInput: string) => {
        if (!startTime) return;

        const timeElapsed = (Date.now() - startTime) / 60000;
        const wordsTyped = finalInput.length / 5;
        const finalWpm = timeElapsed > 0 ? wordsTyped / timeElapsed : 0;

        let correctChars = 0;
        for (let i = 0; i < finalInput.length; i++) {
            if (finalInput[i] === text[i]) {
                correctChars++;
            }
        }

        const finalAccuracy = finalInput.length > 0 ? (correctChars / finalInput.length) * 100 : 0;
        const finalScore = Math.round(finalWpm * finalAccuracy);

        setWpm(Math.round(finalWpm * 10) / 10);
        setAccuracy(Math.round(finalAccuracy * 10) / 10);
        setScore(finalScore);
        setIsCompleted(true);

        if (finalWpm > topSpeed) {
            setTopSpeed(Math.round(finalWpm * 10) / 10);
        }
        setLastSpeed(Math.round(finalWpm * 10) / 10);
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setTopic(suggestion);
        setShowSuggestions(false);
        // Optional: Auto-generate content when a suggestion is clicked
        // generateTypingContent(suggestion);
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
                                onFocus={() => setShowSuggestions(true)}
                                placeholder="Enter a topic for typing practice..."
                                className="w-full px-3 py-2 bg-zinc-800 text-zinc-300 rounded border border-zinc-700 focus:outline-none focus:border-zinc-500 topic-input"
                            />

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
                            onClick={() => generateTypingContent(topic)}
                            disabled={isGenerating}
                            className={`ml-2 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors relative ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isGenerating ? 'Generating...' : 'Generate'}
                            <span className="absolute -top-2 -right-2 bg-green-500 text-xs text-white px-1 py-0.5 rounded-full font-bold">NEW</span>
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
                        allKeys="ENIARLTOSUDYCGHPKBFZXQJ"
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
                        />

                        {/* Overlay message when completed */}
                        {isCompleted && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                <div className="bg-zinc-800 p-4 rounded shadow-lg">
                                    <h3 className="text-xl mb-2">Test Completed!</h3>
                                    <p>WPM: {wpm.toFixed(1)} | Accuracy: {accuracy.toFixed(1)}%</p>
                                    <button
                                        onClick={resetTest}
                                        className="mt-3 px-4 py-2 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 transition-colors w-full"
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
