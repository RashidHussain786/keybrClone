import { useState, useCallback, useEffect, useRef } from 'react';
import {
    calculateWpm,
    calculateAccuracy,
    calculateScore,
    roundNumber
} from '../utils/metrics';
import { DEFAULT_TEXT, DEFAULT_DAILY_GOAL } from '../utils/constants';
import { TextState, TestState, TypingMetrics } from '../types';

export function useTypingTest() {
    // Text state
    const [textState, setTextState] = useState<TextState>({
        text: DEFAULT_TEXT,
        input: '',
        cursorPosition: 0
    });

    // Test state
    const [testState, setTestState] = useState<TestState>({
        startTime: null,
        isCompleted: false,
        isGenerating: false
    });

    // Metrics state
    const [metrics, setMetrics] = useState<TypingMetrics>({
        wpm: 0,
        accuracy: 0,
        score: 0,
        lastSpeed: 0,
        topSpeed: 0,
        dailyGoal: DEFAULT_DAILY_GOAL,
        dailyProgress: 0
    });

    // Use ref to track if test is completed to avoid stale closure issues
    const isCompletedRef = useRef(false);

    // Update ref when state changes
    useEffect(() => {
        isCompletedRef.current = testState.isCompleted;
    }, [testState.isCompleted]);

    // Set the text for the typing test
    const setText = useCallback((newText: string) => {
        setTextState(prev => ({
            ...prev,
            text: newText
        }));
    }, []);

    // Reset the test to its initial state
    const resetTest = useCallback(() => {
        setTextState(prev => ({
            ...prev,
            input: '',
            cursorPosition: 0
        }));

        setTestState(prev => ({
            ...prev,
            startTime: null,
            isCompleted: false
        }));

        setMetrics(prev => ({
            ...prev,
            wpm: 0,
            accuracy: 0,
            score: 0
        }));

        isCompletedRef.current = false;
    }, []);

    // Start the test if it hasn't started yet
    const startTestIfNeeded = useCallback(() => {
        setTestState(prev => {
            if (prev.startTime === null) {
                return {
                    ...prev,
                    startTime: Date.now()
                };
            }
            return prev;
        });
    }, []);

    // Complete the typing test
    const completeTest = useCallback((finalInput: string) => {
        // Guard against multiple calls to complete
        if (!testState.startTime || isCompletedRef.current) return;

        // Mark as completed immediately using ref
        isCompletedRef.current = true;

        const timeElapsed = Date.now() - testState.startTime;
        const finalWpm = calculateWpm(finalInput.length, timeElapsed);
        const finalAccuracy = calculateAccuracy(finalInput, textState.text);
        const finalScore = calculateScore(finalWpm, finalAccuracy);

        setMetrics(prev => ({
            ...prev,
            wpm: roundNumber(finalWpm),
            accuracy: roundNumber(finalAccuracy),
            score: finalScore,
            lastSpeed: roundNumber(finalWpm),
            topSpeed: finalWpm > prev.topSpeed ? roundNumber(finalWpm) : prev.topSpeed
        }));

        setTestState(prev => ({
            ...prev,
            isCompleted: true
        }));
    }, [testState.startTime, textState.text]);

    // Handle key press during the test
    const handleKeyPress = useCallback((key: string) => {
        if (testState.isCompleted || testState.isGenerating || isCompletedRef.current) return;

        startTestIfNeeded();

        setTextState(prev => {
            const newInput = prev.input + key;
            const newCursorPosition = prev.cursorPosition + 1;

            // Check if the test is about to be completed
            if (newCursorPosition >= prev.text.length) {
                // Schedule completion for next tick to ensure state update happens
                setTimeout(() => {
                    completeTest(newInput);
                }, 10);
            }

            return {
                ...prev,
                input: newInput,
                cursorPosition: newCursorPosition
            };
        });
    }, [testState.isCompleted, testState.isGenerating, completeTest, startTestIfNeeded]);

    // Handle backspace key during the test
    const handleBackspace = useCallback(() => {
        if (testState.isCompleted || testState.isGenerating || isCompletedRef.current) return;

        startTestIfNeeded();

        setTextState(prev => {
            if (prev.cursorPosition > 0) {
                return {
                    ...prev,
                    input: prev.input.substring(0, prev.input.length - 1),
                    cursorPosition: prev.cursorPosition - 1
                };
            }
            return prev;
        });
    }, [testState.isCompleted, testState.isGenerating, startTestIfNeeded]);

    // Update typing metrics based on current input
    const updateMetrics = useCallback(() => {
        if (!testState.startTime || testState.isCompleted) return;

        const { input } = textState;
        const { text } = textState;
        const timeElapsed = Date.now() - testState.startTime;

        const currentWpm = calculateWpm(input.length, timeElapsed);
        const currentAccuracy = calculateAccuracy(input, text);
        const currentScore = calculateScore(currentWpm, currentAccuracy);

        setMetrics(prev => {
            // Smoothing the values for a more stable display
            const newWpm = roundNumber((prev.wpm * 0.9 + currentWpm * 0.1));
            const newAccuracy = roundNumber((prev.accuracy * 0.9 + currentAccuracy * 0.1));
            const newLastSpeed = roundNumber(currentWpm);

            // Update top speed if current speed is higher
            const newTopSpeed = currentWpm > prev.topSpeed
                ? roundNumber(currentWpm)
                : prev.topSpeed;

            // Update daily progress (capped at the daily goal)
            const newDailyProgress = Math.min(prev.dailyProgress + 0.01, prev.dailyGoal);

            return {
                ...prev,
                wpm: newWpm,
                accuracy: newAccuracy,
                score: currentScore,
                lastSpeed: newLastSpeed,
                topSpeed: newTopSpeed,
                dailyProgress: newDailyProgress
            };
        });
    }, [textState, testState]);

    // Set the generating state
    const setGenerating = useCallback((isGenerating: boolean) => {
        setTestState(prev => ({
            ...prev,
            isGenerating
        }));
    }, []);

    // Update metrics when input changes
    useEffect(() => {
        updateMetrics();
    }, [textState.input, updateMetrics]);

    return {
        text: textState.text,
        input: textState.input,
        cursorPosition: textState.cursorPosition,
        startTime: testState.startTime,
        isCompleted: testState.isCompleted,
        isGenerating: testState.isGenerating,
        wpm: metrics.wpm,
        accuracy: metrics.accuracy,
        score: metrics.score,
        lastSpeed: metrics.lastSpeed,
        topSpeed: metrics.topSpeed,
        dailyGoal: metrics.dailyGoal,
        dailyProgress: metrics.dailyProgress,
        setText,
        resetTest,
        handleKeyPress,
        handleBackspace,
        setGenerating,
        completeTest
    };
} 