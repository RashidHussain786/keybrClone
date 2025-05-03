/**
 * Calculates the words per minute (WPM) based on input and time
 */
export function calculateWpm(
    inputLength: number,
    timeElapsedMs: number
): number {
    const timeElapsedMinutes = timeElapsedMs / 60000;
    const wordsTyped = inputLength / 5; // Standard definition: 5 characters = 1 word
    return timeElapsedMinutes > 0 ? wordsTyped / timeElapsedMinutes : 0;
}

/**
 * Calculates typing accuracy by comparing input with target text
 */
export function calculateAccuracy(
    input: string,
    targetText: string
): number {
    if (input.length === 0) return 0;

    let correctChars = 0;
    for (let i = 0; i < input.length; i++) {
        if (i < targetText.length && input[i] === targetText[i]) {
            correctChars++;
        }
    }

    return (correctChars / input.length) * 100;
}

/**
 * Calculates the overall typing score
 */
export function calculateScore(wpm: number, accuracy: number): number {
    return Math.round(wpm * accuracy);
}

/**
 * Rounds a number to a specified number of decimal places
 */
export function roundNumber(num: number, decimals: number = 1): number {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
} 