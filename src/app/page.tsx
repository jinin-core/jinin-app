"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NeonButton } from "@/components/NeonButton";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PortalPage() {
  const router = useRouter();

  return (
    <div className="flex-grow flex flex-col items-center w-full bg-black p-6 relative overflow-x-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--color-neon-cyan)_0%,_transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--color-neon-pink)_0%,_transparent_80%)]" />

      <div className="z-10 w-full flex flex-col items-center pt-8 my-auto">
        {/* LOGO IMAGE with Float Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0], filter: "blur(0px)" }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.8, ease: "easeOut" },
            filter: { duration: 0.8 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }
          }}
          className="relative w-[130%] max-w-[420px] md:w-full md:max-w-md mb-8 mt-4 z-10 pointer-events-none drop-shadow-[0_0_25px_rgba(0,255,255,0.4)] rounded-[2rem] overflow-hidden mix-blend-screen"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jinin_logo.png"
            alt="JININ Logo"
            className="w-full h-auto object-contain scale-[1.08] opacity-90"
          />
          {/* subtle scanline over logo */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay pointer-events-none"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, letterSpacing: "0em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="text-neon-cyan pl-3 text-[10px] md:text-sm mb-16 uppercase font-mono text-glow-cyan font-black animate-glitch tracking-[0.4em]"
        >
          Diagnosis Platform
        </motion.div>

        {/* Diagnosis Link Card */}
        <div className="w-full max-w-sm bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="p-6 relative z-10">
            <div className="flex items-center space-x-2 text-neon-pink mb-4">
              <Zap size={24} className="fill-neon-pink animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#ededed]">New Release</span>
            </div>

            <h2 className="text-2xl font-bold mb-2 text-white">隠れ地雷度診断</h2>
            <p className="text-sm text-gray-400 mb-6">
              あなたの心の奥底に潜む「メンヘラ・地雷」要素を、直感的なスワイプで暴き出します。
            </p>

            {/* Character Preview */}
            <div className="mb-6 pt-5 border-t border-gray-800">
              <p className="text-[11px] text-neon-cyan font-bold mb-3 tracking-wider flex items-center">
                <span className="mr-1">▶</span> 全16タイプの診断結果
              </p>
              <div className="flex items-center -space-x-3">
                <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden z-30 shadow-[0_0_10px_rgba(255,0,255,0.3)] bg-gray-900">
                  <Image src="/jirai/cyber_general.png" alt="char1" fill className="object-cover object-top scale-110" />
                </div>
                <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden z-20 shadow-[0_0_10px_rgba(0,255,255,0.3)] bg-gray-900">
                  <Image src="/jirai/ltcs.png" alt="char2" fill className="object-cover object-top scale-110" />
                </div>
                <div className="relative w-12 h-12 rounded-full border-2 border-black overflow-hidden z-10 shadow-[0_0_10px_rgba(255,0,255,0.3)] bg-gray-900">
                  <Image src="/jirai/htcb.png" alt="char3" fill className="object-cover object-top scale-110" />
                </div>
                <div className="relative w-12 h-12 rounded-full border-2 border-black bg-[#111] flex items-center justify-center z-0">
                  <span className="text-[10px] font-mono font-bold text-gray-400">+13 Types</span>
                </div>
              </div>
            </div>

            <NeonButton onClick={() => router.push("/jirai")} color="pink" className="w-full">
              診断を始める
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
