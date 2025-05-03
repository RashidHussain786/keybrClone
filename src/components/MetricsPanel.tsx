import React from 'react';

interface MetricsPanelProps {
    wpm: number;
    accuracy: number;
    score: number;
    allKeys: string;
    currentKey: string;
    lastSpeed: number;
    topSpeed: number;
    dailyGoal: number;
    dailyProgress: number;
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

    return (
        <div className="text-sm">
            <div className="flex space-x-6 mb-3">
                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Metrics:</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Speed:</span>
                    <span>{hasWpm ? `${wpm.toFixed(1)}wpm` : 'N/A'}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Accuracy:</span>
                    <span>{hasAccuracy ? `${accuracy.toFixed(1)}%` : 'N/A'}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Score:</span>
                    <span>{hasScore ? score : 'N/A'}</span>
                </div>
            </div>

            <div className="flex space-x-2 mb-3">
                <span className="text-zinc-500">All keys:</span>
                <div className="flex space-x-1">
                    {allKeys.split('').map((key, index) => (
                        <span
                            key={index}
                            className={`px-1 rounded ${key === currentKey ? 'bg-zinc-700' : ''}`}
                        >
                            {key}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex space-x-6 mb-3">
                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Current key:</span>
                    <span className={`${currentKey ? 'bg-yellow-800' : 'bg-zinc-700'} px-2 py-0.5 rounded`}>
                        {currentKey || '-'}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Last speed:</span>
                    <span>{lastSpeed > 0 ? `${lastSpeed.toFixed(1)}wpm` : 'N/A'}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Top speed:</span>
                    <span>{topSpeed > 0 ? `${topSpeed.toFixed(1)}wpm` : 'N/A'}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-zinc-500">Learning rate:</span>
                    <span>{hasWpm && hasAccuracy ? 'Learning' : 'Not started'}</span>
                </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
                <span className="text-zinc-500">Accuracy:</span>
                <span>
                    {hasAccuracy
                        ? `Current session: ${accuracy.toFixed(1)}% accuracy`
                        : 'No data yet'}
                </span>
            </div>

            <div className="flex items-center space-x-2">
                <span className="text-zinc-500">Daily goal:</span>
                <span>{dailyProgress.toFixed(1)}/{dailyGoal} minutes</span>
                <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-zinc-600 rounded-full transition-all duration-300"
                        style={{ width: `${(dailyProgress / dailyGoal) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
