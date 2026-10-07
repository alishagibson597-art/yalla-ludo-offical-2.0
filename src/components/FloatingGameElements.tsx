import React from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles } from 'lucide-react';

interface FloatingElementsProps {
  interactive?: boolean;
  onDiceClick?: () => void;
}

export const FloatingGameElements: React.FC<FloatingElementsProps> = ({
  interactive = true,
  onDiceClick,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* 3D Dice - Top Left */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-6, 6, -6],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-3 -left-4 sm:top-6 sm:left-4 z-30 ${interactive ? 'pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-transform' : ''}`}
        onClick={onDiceClick}
        title="Tap to roll dice!"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-500 via-rose-600 to-red-800 p-2 shadow-[0_15px_35px_rgba(239,68,68,0.5),inset_0_2px_4px_rgba(255,255,255,0.4)] border border-red-400/50 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
          <div className="flex justify-center">
            <span className="w-3 h-3 rounded-full bg-amber-200 shadow-sm" />
          </div>
          <div className="flex justify-between">
            <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow">
            6!
          </div>
        </div>
      </motion.div>

      {/* Golden Dice - Bottom Right */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [12, -4, 12],
        }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className={`absolute -bottom-4 -right-2 sm:bottom-12 sm:right-4 z-30 ${interactive ? 'pointer-events-auto cursor-pointer hover:scale-110 transition-transform' : ''}`}
        onClick={onDiceClick}
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 p-2 shadow-[0_15px_35px_rgba(245,158,11,0.5),inset_0_2px_5px_rgba(255,255,255,0.7)] border border-yellow-200/80 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-inner" />
          </div>
        </div>
      </motion.div>

      {/* Domino Tile - Middle Left */}
      <motion.div
        animate={{
          y: [-12, 10, -12],
          rotate: [-14, -8, -14],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute top-1/3 -left-5 sm:-left-3 z-30"
      >
        <div className="w-10 sm:w-12 h-20 sm:h-24 rounded-xl bg-gradient-to-b from-stone-50 via-stone-100 to-stone-200 border-2 border-stone-300 shadow-[0_12px_30px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col p-1.5">
          {/* Top half (5 pips) */}
          <div className="flex-1 flex flex-col justify-between py-0.5">
            <div className="flex justify-between">
              <span className="w-2 h-2 rounded-full bg-slate-900 shadow-inner" />
              <span className="w-2 h-2 rounded-full bg-slate-900 shadow-inner" />
            </div>
            <div className="flex justify-center">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-inner" />
            </div>
            <div className="flex justify-between">
              <span className="w-2 h-2 rounded-full bg-slate-900 shadow-inner" />
              <span className="w-2 h-2 rounded-full bg-slate-900 shadow-inner" />
            </div>
          </div>
          {/* Divider line with brass pin */}
          <div className="relative h-[2px] bg-stone-400 my-1 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 border border-stone-300 shadow-xs" />
          </div>
          {/* Bottom half (3 pips) */}
          <div className="flex-1 flex flex-col justify-between py-0.5">
            <div className="flex justify-start">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            <div className="flex justify-center">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            <div className="flex justify-end">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Jackaroo Playing Card - Middle Right */}
      <motion.div
        animate={{
          y: [12, -10, 12],
          rotate: [16, 8, 16],
        }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/4 -right-4 sm:-right-2 z-30"
      >
        <div className="w-14 sm:w-16 h-20 sm:h-24 rounded-xl bg-gradient-to-br from-white via-slate-50 to-slate-200 border-2 border-amber-300/80 shadow-[0_12px_28px_rgba(0,0,0,0.5)] p-1.5 flex flex-col justify-between text-slate-900 font-bold select-none">
          <div className="text-[10px] leading-none text-red-600 flex items-center gap-0.5">
            <span>K</span>
            <span>♥</span>
          </div>
          <div className="text-center text-xl text-red-600 font-serif">
            👑
          </div>
          <div className="text-[10px] leading-none text-red-600 rotate-180 flex items-center gap-0.5 self-end">
            <span>K</span>
            <span>♥</span>
          </div>
        </div>
      </motion.div>

      {/* Floating 3D Ludo Pawn - Yellow */}
      <motion.div
        animate={{
          y: [-10, 8, -10],
          rotate: [8, -6, 8],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-28 -left-4 sm:bottom-32 sm:left-2 z-30"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-200 to-amber-500 shadow-[0_4px_10px_rgba(245,158,11,0.6)] border border-yellow-100" />
          <div className="w-3.5 h-4 bg-gradient-to-b from-amber-400 to-amber-600 -mt-1 rounded-sm" />
          <div className="w-7 h-2.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 shadow-md border-t border-yellow-200" />
        </div>
      </motion.div>

      {/* Floating 3D Ludo Pawn - Blue */}
      <motion.div
        animate={{
          y: [8, -12, 8],
          rotate: [-10, 10, -10],
        }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        className="absolute top-16 -right-3 sm:top-20 sm:right-6 z-30"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-200 to-blue-600 shadow-[0_4px_10px_rgba(37,99,235,0.6)] border border-cyan-100" />
          <div className="w-3.5 h-4 bg-gradient-to-b from-blue-500 to-blue-700 -mt-1 rounded-sm" />
          <div className="w-7 h-2.5 rounded-full bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-800 shadow-md border-t border-cyan-200" />
        </div>
      </motion.div>

      {/* Animated Chat Bubble - Top Right */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          y: [-5, 5, -5],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute top-2 -right-2 sm:top-8 sm:right-16 z-30"
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-indigo-600/95 to-purple-600/95 backdrop-blur-md border border-indigo-400/40 text-white shadow-[0_8px_20px_rgba(79,70,229,0.5)] text-xs font-semibold">
          <Mic className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>“Yalla roll! 🎲”</span>
        </div>
      </motion.div>

      {/* Sparkling Gift Star - Bottom Left */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-8 left-6 sm:bottom-16 sm:left-12 z-20 opacity-80"
      >
        <Sparkles className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
      </motion.div>
    </div>
  );
};
