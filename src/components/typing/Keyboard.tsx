import React from 'react';
import { KeyboardState } from '../../types';

type KeyboardProps = KeyboardState;

type KeyColor = 'green' | 'red' | 'orange' | 'blue' | 'purple' | 'yellow';

interface KeyInfo {
    label: string;
    width?: number; // relative units
    color: KeyColor;
    finger?: string;
}

export const Keyboard: React.FC<KeyboardProps> = ({ pressedKeys, currentKey }) => {
    const keyboardLayout: KeyInfo[][] = [
        [
            { label: '`', color: 'green' },
            { label: '1', color: 'red' },
            { label: '2', color: 'red' },
            { label: '3', color: 'orange' },
            { label: '4', color: 'orange' },
            { label: '5', color: 'orange' },
            { label: '6', color: 'blue' },
            { label: '7', color: 'blue' },
            { label: '8', color: 'purple' },
            { label: '9', color: 'yellow' },
            { label: '0', color: 'yellow' },
            { label: '-', color: 'yellow' },
            { label: '=', color: 'yellow' },
            { label: 'Backspace', width: 2, color: 'green' },
        ],
        [
            { label: 'Tab', width: 1.5, color: 'green' },
            { label: 'Q', color: 'green' },
            { label: 'W', color: 'red' },
            { label: 'E', color: 'orange' },
            { label: 'R', color: 'orange' },
            { label: 'T', color: 'orange' },
            { label: 'Y', color: 'blue' },
            { label: 'U', color: 'blue' },
            { label: 'I', color: 'purple' },
            { label: 'O', color: 'yellow' },
            { label: 'P', color: 'yellow' },
            { label: '[', color: 'yellow' },
            { label: ']', color: 'yellow' },
            { label: '\\', color: 'green' },
        ],
        [
            { label: 'Caps Lock', width: 1.75, color: 'green' },
            { label: 'A', color: 'green' },
            { label: 'S', color: 'red' },
            { label: 'D', color: 'orange' },
            { label: 'F', color: 'orange', finger: 'index' },
            { label: 'G', color: 'orange' },
            { label: 'H', color: 'blue' },
            { label: 'J', color: 'blue', finger: 'index' },
            { label: 'K', color: 'purple' },
            { label: 'L', color: 'yellow' },
            { label: ';', color: 'yellow' },
            { label: "'", color: 'yellow' },
            { label: 'Enter', width: 2, color: 'green' },
        ],
        [
            { label: 'Shift', width: 2.25, color: 'green' },
            { label: 'Z', color: 'green' },
            { label: 'X', color: 'red' },
            { label: 'C', color: 'orange' },
            { label: 'V', color: 'orange' },
            { label: 'B', color: 'blue' },
            { label: 'N', color: 'blue' },
            { label: 'M', color: 'purple' },
            { label: ',', color: 'yellow' },
            { label: '.', color: 'yellow' },
            { label: '/', color: 'yellow' },
            { label: 'Shift', width: 2.25, color: 'green' },
        ],
        [
            { label: 'Ctrl', width: 1.25, color: 'green' },
            { label: 'Alt', width: 1.25, color: 'green' },
            { label: 'Space', width: 6, color: 'red' },
            { label: 'Alt', width: 1.25, color: 'green' },
            { label: 'Ctrl', width: 1.25, color: 'green' },
        ],
    ];

    const colorClasses: Record<KeyColor, string> = {
        green: 'bg-green-800/40 border-green-400/20',
        red: 'bg-red-800/40 border-red-400/20',
        orange: 'bg-orange-800/40 border-orange-400/20',
        blue: 'bg-blue-800/40 border-blue-400/20',
        purple: 'bg-purple-800/40 border-purple-400/20',
        yellow: 'bg-yellow-800/40 border-yellow-400/20',
    };

    const renderKey = (keyInfo: KeyInfo, index: number) => {
        const isPressed = pressedKeys.has(keyInfo.label.toUpperCase());
        const isCurrent = currentKey === keyInfo.label.toUpperCase();

        const baseWidth = 40;
        const keyWidth = keyInfo.width ? baseWidth * keyInfo.width : baseWidth;

        return (
            <div
                key={`${keyInfo.label}-${index}`}
                className={`
          ${colorClasses[keyInfo.color]}
          ${isPressed ? 'bg-opacity-90 border-opacity-70' : ''}
          ${isCurrent ? 'ring-2 ring-white ring-opacity-60' : ''}
          border rounded-md relative overflow-hidden
          flex items-center justify-center
          text-white text-opacity-90 text-sm font-medium
          transition-all duration-100
        `}
                style={{
                    width: `${keyWidth}px`,
                    height: '42px',
                    margin: '2px',
                }}
            >
                {keyInfo.finger === 'index' && (
                    <div className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-[6px] h-[6px] bg-white rounded-full opacity-40" />
                )}
                {keyInfo.label}
            </div>
        );
    };

    return (
        <div className="inline-flex flex-col items-center rounded-lg p-3 bg-black/10">
            {keyboardLayout.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex">
                    {row.map((keyInfo, keyIndex) => renderKey(keyInfo, keyIndex))}
                </div>
            ))}
        </div>
    );
}; 