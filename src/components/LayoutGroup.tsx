import React from 'react';

export const LayoutGroup: React.FC = () => {
    return (
        <div className="w-full p-4 flex justify-center">
            <div className="text-xs text-zinc-600">
                {/* Time buttons */}
                <div className="flex space-x-4 mb-2 justify-center">
                    <button className="opacity-60 hover:opacity-100">15s</button>
                    <button className="opacity-60 hover:opacity-100">30s</button>
                    <button className="bg-zinc-800 px-2 py-1 rounded">time</button>
                    <button className="opacity-60 hover:opacity-100">60s</button>
                    <button className="opacity-60 hover:opacity-100">120s</button>
                </div>

                {/* Words buttons */}
                <div className="flex space-x-4 justify-center">
                    <button className="opacity-60 hover:opacity-100">10</button>
                    <button className="opacity-60 hover:opacity-100">25</button>
                    <button className="bg-zinc-800 px-2 py-1 rounded">words</button>
                    <button className="opacity-60 hover:opacity-100">50</button>
                    <button className="opacity-60 hover:opacity-100">100</button>
                </div>
            </div>
        </div>
    );
};