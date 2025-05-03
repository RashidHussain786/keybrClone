import React from 'react';

export const Footer: React.FC = () => {
    return (
        <div className="w-full text-xs text-zinc-600 mt-8 flex flex-col items-center">
            <div className="flex flex-col items-center mb-2">
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">info@monkr.com</span>
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">Discord</span>
                <a
                    href="https://github.com/RashidHussain786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 hover:text-zinc-400 cursor-pointer"
                >
                    GitHub
                </a>
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">Terms of Service</span>
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            </div>
            <div className="flex flex-col items-center max-w-[100px]">
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">English</span>
                <span className="mx-1 hover:text-zinc-400 cursor-pointer text-center">af ar bg ca cs da de el es et fa fi fr hu it ja ko lt lv nb nl pl pt ro ru sk sl sr sv tr uk vi zh-hans zh-hant</span>
            </div>
            <div className="flex flex-col items-center mt-1">
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">Translate</span>
                <span className="mx-1 hover:text-zinc-400 cursor-pointer">Remove Ads</span>
            </div>
        </div>
    );
}; 