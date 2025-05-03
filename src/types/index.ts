// Type definitions for the typing test application

export interface TypingMetrics {
    wpm: number;
    accuracy: number;
    score: number;
    lastSpeed: number;
    topSpeed: number;
    dailyGoal: number;
    dailyProgress: number;
}

export interface KeyboardState {
    pressedKeys: Set<string>;
    currentKey: string;
}

export interface TextState {
    text: string;
    input: string;
    cursorPosition: number;
}

export interface TestState {
    startTime: number | null;
    isCompleted: boolean;
    isGenerating: boolean;
}

export interface TopicState {
    topic: string;
    filteredSuggestions: string[];
    showSuggestions: boolean;
} 