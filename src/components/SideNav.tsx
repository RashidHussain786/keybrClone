import React from 'react';
import { Award, BarChart2, HelpCircle, LayoutGrid, User, Users, } from 'lucide-react';

export const SideNav: React.FC = () => {
    const navItems = [
        { icon: <BarChart2 size={18} />, label: 'Practice' },
        { icon: <User size={18} />, label: 'Profile' },
        { icon: <HelpCircle size={18} />, label: 'Help' },
        { icon: <Award size={18} />, label: 'High Scores' },
        { icon: <Users size={18} />, label: 'Multiplayer' },
        { icon: <BarChart2 size={18} />, label: 'Typing Test' },
        { icon: <LayoutGrid size={18} />, label: 'Layouts' },
    ];

    return (
        <div className="mt-6">
            <div className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-start text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
                        <div className="w-6 h-6 flex items-center justify-center">
                            {item.icon}
                        </div>
                        <span className="mr-2 text-sm">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};