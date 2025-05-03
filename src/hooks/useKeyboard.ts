import { useState, useEffect, useCallback } from 'react';
import { KeyboardState } from '../types';

export function useKeyboard(onKeyPress: (key: string) => void, onBackspace: () => void, isActive: boolean = true) {
    const [keyboardState, setKeyboardState] = useState<KeyboardState>({
        pressedKeys: new Set<string>(),
        currentKey: ''
    });

    // Handle keydown events
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;

        // Prevent handling if we're typing in an input field
        if (document.activeElement?.tagName === 'INPUT') {
            return;
        }

        // Prevent default behavior for specific keys
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
        }

        // Update pressed keys
        setKeyboardState(prev => {
            const newPressedKeys = new Set(prev.pressedKeys);
            newPressedKeys.add(e.key.toUpperCase());

            return {
                pressedKeys: newPressedKeys,
                currentKey: e.key.toUpperCase()
            };
        });

        // Handle backspace
        if (e.key === 'Backspace') {
            onBackspace();
            e.preventDefault();
        }
        // Handle regular key press
        else if (e.key.length === 1) {
            onKeyPress(e.key);
            e.preventDefault();
        }
    }, [isActive, onKeyPress, onBackspace]);

    // Handle keyup events
    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (!isActive) return;

        setKeyboardState(prev => {
            const newPressedKeys = new Set(prev.pressedKeys);
            newPressedKeys.delete(e.key.toUpperCase());

            return {
                ...prev,
                pressedKeys: newPressedKeys
            };
        });
    }, [isActive]);

    // Set up and clean up event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return {
        pressedKeys: keyboardState.pressedKeys,
        currentKey: keyboardState.currentKey
    };
} 