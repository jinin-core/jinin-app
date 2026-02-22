"use client";

import React, { useState } from "react";
import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from "framer-motion";

interface SwipeCardProps {
    question: string;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ question, onSwipeLeft, onSwipeRight }) => {
    const x = useMotionValue(0);
    const controls = useAnimation();
    const [exitX, setExitX] = useState<number>(0);

    // Rotate based on x position
    const rotate = useTransform(x, [-200, 200], [-10, 10]);

    // Opacities for the YES / NO indicators
    const likeOpacity = useTransform(x, [0, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

    // Dynamic background color tinting for stronger visual feedback
    const dynamicColor = useTransform(
        x,
        [-150, 0, 150],
        ["rgba(0, 255, 255, 0.4)", "rgba(5, 5, 5, 1)", "rgba(255, 0, 255, 0.4)"]
    );

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            setExitX(250);
            onSwipeRight(); // YES
        } else if (info.offset.x < -100) {
            setExitX(-250);
            onSwipeLeft(); // NO
        }
    };

    return (
        <>
            <motion.div
                className="relative w-full h-[60vh] min-h-[400px] max-h-[550px] flex items-center justify-center p-6 border border-gray-800 rounded-3xl shadow-lg cursor-grab active:cursor-grabbing backdrop-blur-md z-10 box-glow-cyan overflow-hidden"
                style={{ x, rotate, backgroundColor: dynamicColor }}
                drag="x"
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                animate={{ x: exitX, opacity: exitX !== 0 ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Glow Indicators behind text - made stronger */}
                    <motion.div
                        className="absolute inset-0 bg-neon-pink/40 blur-2xl rounded-full mix-blend-screen"
                        style={{ opacity: likeOpacity, pointerEvents: "none" }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-neon-cyan/40 blur-2xl rounded-full mix-blend-screen"
                        style={{ opacity: nopeOpacity, pointerEvents: "none" }}
                    />

                    {/* Swipe Indicators */}
                    <motion.div
                        className="absolute top-4 left-4 border-2 border-neon-cyan px-4 py-1 rounded-md transform -rotate-12 font-black text-2xl uppercase tracking-widest text-shadow-cyan bg-black/50 backdrop-blur-sm"
                        style={{ opacity: nopeOpacity, color: "#fff", borderColor: "#00FFFF", boxShadow: "0 0 10px #00FFFF, inset 0 0 10px #00FFFF" }}
                    >
                        NO
                    </motion.div>
                    <motion.div
                        className="absolute top-4 right-4 border-2 border-neon-pink px-4 py-1 rounded-md transform rotate-12 font-black text-2xl uppercase tracking-widest text-shadow-pink bg-black/50 backdrop-blur-sm"
                        style={{ opacity: likeOpacity, color: "#fff", borderColor: "#FF00FF", boxShadow: "0 0 10px #FF00FF, inset 0 0 10px #FF00FF" }}
                    >
                        YES
                    </motion.div>

                    {/* Question Text */}
                    <p className="text-xl md:text-2xl font-bold text-center text-[#ededed] leading-relaxed z-10 pointer-events-none drop-shadow-lg p-4 bg-black/30 rounded-xl mt-4">
                        {question}
                    </p>

                    {/* Decorative elements / Tap Buttons */}
                    <div className="absolute bottom-4 font-mono flex justify-between w-full px-6 text-sm font-black z-20">
                        <button
                            onClick={(e) => { e.stopPropagation(); onSwipeLeft(); }}
                            className="text-neon-cyan hover:text-white transition-colors py-2 px-4 bg-black/50 rounded-lg border border-neon-cyan/50 backdrop-blur-md active:scale-95"
                        >
                            ← NO
                        </button>
                        <span className="text-gray-500 pointer-events-none flex items-center">SWIPE</span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onSwipeRight(); }}
                            className="text-neon-pink hover:text-white transition-colors py-2 px-4 bg-black/50 rounded-lg border border-neon-pink/50 backdrop-blur-md active:scale-95"
                        >
                            YES →
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};
