import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Mic, Dices, ChevronRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

const HERO_IMAGE_PATH = '/src/assets/images/yalla_ludo_hero_cinematic_1791375036147.jpg';

interface HeroSceneProps {
  onExploreModes?: () => void;
  onDownloadClick?: () => void;
  onPlayNow?: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onExploreModes,
  onDownloadClick,
  onPlayNow,
}) => {
  const [diceVal, setDiceVal] = useState<number>(6);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [tapBonus, setTapBonus] = useState<number>(0);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    sounds.playDiceRoll();

    setTimeout(() => {
      const next = Math.floor(Math.random() * 6) + 1;
      setDiceVal(next);
      setIsRolling(false);
      setTapBonus((prev) => prev + next * 500);
      sounds.playCoinChime();
    }, 700);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork with cinematic lighting overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_PATH}
          alt="Yalla Ludo Board Game"
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter saturate-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Top Banner Branding */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>#1 Social Board Game & Voice Chat</span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2"
        >
          <span>🎲</span>
          <span>YALLA LUDO</span>
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg font-semibold text-amber-100/90 tracking-wide mt-1 drop-shadow"
        >
          “Play • Chat • Connect • Enjoy”
        </motion.p>
      </div>

      {/* Center Interactive Game Showcase Preview */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Interactive Rollable 3D Dice Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="relative flex flex-col items-center"
        >
          <div
            onClick={handleRoll}
            className={`cursor-pointer group relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-3 bg-gradient-to-br from-red-500 via-rose-600 to-red-800 border-2 border-red-300/80 shadow-[0_20px_45px_rgba(225,29,72,0.6),inset_0_3px_6px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105 active:scale-95 flex flex-col justify-between ${
              isRolling ? 'animate-dice-spin' : ''
            }`}
          >
            {/* Top row */}
            <div className="flex justify-between">
              {(diceVal === 2 || diceVal === 3 || diceVal === 4 || diceVal === 5 || diceVal === 6) && (
                <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
              )}
              {diceVal === 6 && <span className="w-4 h-4 rounded-full bg-white shadow-sm" />}
              {(diceVal === 4 || diceVal === 5 || diceVal === 6) && (
                <span className="w-4 h-4 rounded-full bg-white shadow-sm ml-auto" />
              )}
            </div>

            {/* Middle row */}
            <div className="flex justify-center">
              {(diceVal === 1 || diceVal === 3 || diceVal === 5) && (
                <span className="w-4 h-4 rounded-full bg-amber-200 shadow-md ring-2 ring-amber-400" />
              )}
            </div>

            {/* Bottom row */}
            <div className="flex justify-between">
              {(diceVal === 4 || diceVal === 5 || diceVal === 6) && (
                <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
              )}
              {diceVal === 6 && <span className="w-4 h-4 rounded-full bg-white shadow-sm" />}
              {(diceVal === 2 || diceVal === 3 || diceVal === 4 || diceVal === 5 || diceVal === 6) && (
                <span className="w-4 h-4 rounded-full bg-white shadow-sm ml-auto" />
              )}
            </div>

            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase shadow-lg border border-white/60">
              TAP TO ROLL
            </div>
          </div>

          {tapBonus > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-400/50 text-amber-300 text-xs font-bold shadow-md"
            >
              <span>🪙</span>
              <span>Rolled {diceVal}! Bonus: +{tapBonus} Gold</span>
            </motion.div>
          )}

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 w-full max-w-xs">
            <div className="flex flex-col items-center bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 shadow-sm">
              <span className="text-amber-400 font-display font-extrabold text-sm sm:text-base">100M+</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Downloads</span>
            </div>
            <div className="flex flex-col items-center bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 shadow-sm">
              <span className="text-emerald-400 font-display font-extrabold text-sm sm:text-base">4.7 ★</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Top Rated</span>
            </div>
            <div className="flex flex-col items-center bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700/60 shadow-sm">
              <span className="text-cyan-400 font-display font-extrabold text-sm sm:text-base">LIVE HD</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Voice Chat</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Block */}
      <div className="relative z-10 flex flex-col gap-2 pt-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onPlayNow?.();
            }}
            className="py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-black text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5 cursor-pointer transform active:scale-95 transition-all border border-emerald-300"
          >
            <span>🕹️ PLAY GAME</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onDownloadClick?.();
            }}
            className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-display font-black text-xs sm:text-sm tracking-wide shadow-[0_8px_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-1.5 transform active:scale-95 transition-all shimmer-effect cursor-pointer border border-yellow-200"
          >
            <span>DOWNLOAD</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
          <span className="flex items-center gap-1 text-slate-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            2 & 4 Players Online
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            Crystal-Clear Voice
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onExploreModes?.();
            }}
            className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 cursor-pointer"
          >
            All Modes
          </button>
        </div>
      </div>
    </div>
  );
};
