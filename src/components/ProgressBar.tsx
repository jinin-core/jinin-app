import React from "react";

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="w-full max-w-md mx-auto mb-6">
            <div className="flex justify-between items-end mb-2 text-xs font-mono tracking-widest text-[#ededed]">
                <span className="text-neon-cyan">PROGRESS</span>
                <span>
                    <span className="text-neon-pink text-glow-pink text-base font-bold">{current}</span>
                    <span className="opacity-50 mx-1">/</span>
                    {total}
                </span>
            </div>
            <div className="h-2 w-full bg-cyber-black rounded-full overflow-hidden border border-gray-800 relative">
                <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink transition-all duration-300 ease-out"
                    style={{ width: `${percentage}%` }}
                >
                    {/* Glitch sub-layer */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 animate-glitch mix-blend-overlay"></div>
                </div>
            </div>
        </div>
    );
};
