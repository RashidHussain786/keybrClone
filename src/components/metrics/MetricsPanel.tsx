import React from 'react';
import { TypingMetrics } from '../../types';

interface MetricsPanelProps extends TypingMetrics {
    allKeys: string;
    currentKey: string;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
    wpm,
    accuracy,
    score,
    allKeys,
    currentKey,
    lastSpeed,
    topSpeed,
    dailyGoal,
    dailyProgress
}) => {
    // Only show improvement indicators if there are actual values
    const hasWpm = wpm > 0;
    const hasAccuracy = accuracy > 0;
    const hasScore = score > 0;

    // Common label style with fixed width for alignment
    const labelStyle = "text-zinc-500 w-24 text-right pr-2";

    return (
        <div className="text-sm">
            {/* First row with main metrics */}
            <div className="flex mb-2.5">
                <span className={labelStyle}>Metrics:</span>
                <div className="flex space-x-6">
                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Speed:</span>
                        <span>{hasWpm ? `${wpm.toFixed(1)}wpm` : 'N/A'}</span>
                    </div>

                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Accuracy:</span>
                        <span>{hasAccuracy ? `${accuracy.toFixed(1)}%` : 'N/A'}</span>
                    </div>

                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Score:</span>
                        <span>{hasScore ? score : 'N/A'}</span>
                    </div>
                </div>
            </div>

            {/* All keys row */}
            <div className="flex items-center mb-2.5">
                <span className={labelStyle}>All keys:</span>
                <div className="flex flex-wrap">
                    {allKeys.split('').map((key, index) => (
                        <span
                            key={index}
                            className={`px-1.5 mx-0.5 rounded ${key === currentKey ? 'bg-zinc-700' : ''}`}
                        >
                            {key}
                        </span>
                    ))}
                </div>
            </div>

            {/* Additional metrics row */}
            <div className="flex mb-2.5">
                <span className={labelStyle}>Current key:</span>
                <span className={`${currentKey ? 'bg-yellow-800' : 'bg-zinc-700'} px-2 py-0.5 rounded mr-6`}>
                    {currentKey || '-'}
                </span>

                <div className="flex space-x-6">
                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Last speed:</span>
                        <span>{lastSpeed > 0 ? `${lastSpeed.toFixed(1)}wpm` : 'N/A'}</span>
                    </div>

                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Top speed:</span>
                        <span>{topSpeed > 0 ? `${topSpeed.toFixed(1)}wpm` : 'N/A'}</span>
                    </div>

                    <div className="flex items-center">
                        <span className="text-zinc-500 pr-1">Learning:</span>
                        <span>{hasWpm && hasAccuracy ? 'Active' : 'Not started'}</span>
                    </div>
                </div>
            </div>

            {/* Accuracy detail row */}
            <div className="flex items-center mb-2.5">
                <span className={labelStyle}>Accuracy:</span>
                <span>
                    {hasAccuracy
                        ? `Current session: ${accuracy.toFixed(1)}% accuracy`
                        : 'No data yet'}
                </span>
            </div>

            {/* Daily goal row */}
            <div className="flex items-center">
                <span className={labelStyle}>Daily goal:</span>
                <div className="flex items-center space-x-2">
                    <span>{dailyProgress.toFixed(1)}/{dailyGoal} minutes</span>
                    <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-zinc-600 rounded-full transition-all duration-300"
                            style={{ width: `${(dailyProgress / dailyGoal) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 