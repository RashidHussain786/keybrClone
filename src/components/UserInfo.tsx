import React from 'react';
import { GithubIcon, InfoIcon, RotateCw, Settings } from 'lucide-react';

export const UserInfo: React.FC = () => {
    return (
        <div className="flex flex-col items-center mb-6">
            <div className="flex items-center mb-4">
                <button className="text-zinc-500 hover:text-zinc-300 mr-3">
                    <InfoIcon size={18} />
                </button>
                <button className="text-zinc-500 hover:text-zinc-300 mr-3">
                    <RotateCw size={18} />
                </button>
                <button className="text-zinc-500 hover:text-zinc-300 mr-3">
                    <Settings size={18} />
                </button>
                <a
                    href="https://github.com/RashidHussain786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center overflow-hidden hover:bg-zinc-500 transition-colors"
                    title="Visit Rashid Hussain's GitHub profile"
                >
                    <GithubIcon size={16} />
                </a>
            </div>
            <div className="text-sm text-right">
                <div className="text-zinc-400">Sign-in</div>
            </div>
        </div>
    );
};
