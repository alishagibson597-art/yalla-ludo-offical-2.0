import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Layers, ShieldCheck, Sparkles, Wand2, Users, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

type ActiveGame = 'ludo' | 'domino' | 'jackaroo';

export const GameModesScene: React.FC = () => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('ludo');
  const [selectedSubmode, setSelectedSubmode] = useState<string>('Classic');
  const [interactivePawnMoved, setInteractivePawnMoved] = useState<boolean>(false);

  const handleSelectGame = (game: ActiveGame) => {
    setActiveGame(game);
    sounds.playClick();
    if (game === 'ludo') setSelectedSubmode('Classic');
    if (game === 'domino') setSelectedSubmode('Draw Game');
    if (game === 'jackaroo') setSelectedSubmode('Basic');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Dynamic Background Glow based on active game */}
      <div className="absolute inset-0 pointer-events-none">
        {activeGame === 'ludo' && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-red-600/15 blur-3xl" />
        )}
        {activeGame === 'domino' && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl" />
        )}
        {activeGame === 'jackaroo' && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl" />
        )}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/80 to-slate-950" />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>All Your Favorites in One App</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
          <span>🎮</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-400">
            MULTIPLE GAME MODES
          </span>
        </h2>
        <p className="text-xs text-slate-300 font-medium mt-0.5">
          Choose your board, pick your mode and challenge millions!
        </p>

        {/* 3 Main Game Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-700/80 mt-3 w-full max-w-xs shadow-md">
          <button
            onClick={() => handleSelectGame('ludo')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeGame === 'ludo'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎲</span>
            <span>LUDO</span>
          </button>

          <button
            onClick={() => handleSelectGame('domino')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeGame === 'domino'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🀄</span>
            <span>DOMINO</span>
          </button>

          <button
            onClick={() => handleSelectGame('jackaroo')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeGame === 'jackaroo'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏹</span>
            <span>JACKAROO</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Gameplay Viewport */}
      <div className="relative z-10 my-auto flex flex-col items-center w-full">
        <AnimatePresence mode="wait">
          {/* LUDO MODE */}
          {activeGame === 'ludo' && (
            <motion.div
              key="ludo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Authentic Stylized Ludo Board Preview */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-slate-900 rounded-3xl p-2.5 border-2 border-red-500/40 shadow-[0_15px_35px_rgba(239,68,68,0.3)] grid grid-cols-2 gap-2">
                {/* Red Quarter */}
                <div className="bg-red-600/90 rounded-2xl p-2 flex flex-col justify-between border border-red-400/60 shadow-inner">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                  <div className="flex justify-center">
                    <div
                      onClick={() => {
                        sounds.playClick();
                        setInteractivePawnMoved(!interactivePawnMoved);
                      }}
                      className="cursor-pointer group flex flex-col items-center transform hover:scale-125 transition-transform"
                    >
                      <span className="w-4 h-4 rounded-full bg-yellow-300 ring-2 ring-white shadow-md" />
                      <span className="text-[8px] font-black text-white mt-0.5">YOU</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>

                {/* Green Quarter */}
                <div className="bg-emerald-600/90 rounded-2xl p-2 flex flex-col justify-between border border-emerald-400/60 shadow-inner">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                  <div className="flex justify-center text-xs">💚</div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>

                {/* Blue Quarter */}
                <div className="bg-blue-600/90 rounded-2xl p-2 flex flex-col justify-between border border-blue-400/60 shadow-inner">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                  <div className="flex justify-center text-xs">💙</div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>

                {/* Yellow Quarter */}
                <div className="bg-amber-500/90 rounded-2xl p-2 flex flex-col justify-between border border-amber-300/60 shadow-inner">
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                  <div className="flex justify-center text-xs">💛</div>
                  <div className="flex justify-between">
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                    <span className="w-3 h-3 rounded-full bg-white shadow" />
                  </div>
                </div>

                {/* Center Star Goal */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 border-2 border-white flex items-center justify-center shadow-lg">
                  <span className="text-xl">⭐</span>
                </div>
              </div>

              {/* LUDO Feature Tags */}
              <div className="w-full mt-3 flex flex-wrap justify-center gap-1.5 px-2">
                {[
                  '2 & 4 Players',
                  'Team Mode',
                  'Classic',
                  'Master',
                  'Quick',
                  'Arrow',
                  'Magic Tools',
                ].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectedSubmode(mode);
                      sounds.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedSubmode === mode
                        ? 'bg-red-500 text-white shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* DOMINO MODE */}
          {activeGame === 'domino' && (
            <motion.div
              key="domino"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Realistic Domino Game Table */}
              <div className="relative w-full max-w-xs h-48 bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-3 border-2 border-amber-500/40 shadow-[0_15px_35px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center">
                {/* Connected Domino Chain */}
                <div className="flex items-center gap-2">
                  {/* Tile 1: [6|6] */}
                  <div
                    onClick={() => sounds.playDominoClick()}
                    className="w-9 h-18 rounded-lg bg-stone-100 border border-stone-300 shadow-md p-1 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-transform"
                  >
                    <div className="grid grid-cols-2 gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>
                    <div className="h-[1px] bg-stone-400" />
                    <div className="grid grid-cols-2 gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>
                  </div>

                  {/* Tile 2: [6|5] Horizontal */}
                  <div
                    onClick={() => sounds.playDominoClick()}
                    className="w-18 h-9 rounded-lg bg-stone-100 border border-stone-300 shadow-md p-1 flex items-center justify-between cursor-pointer hover:-translate-y-1 transition-transform"
                  >
                    <div className="grid grid-cols-3 gap-0.5 px-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>
                    <div className="w-[1px] h-full bg-stone-400" />
                    <div className="flex flex-col justify-between h-full px-1">
                      <div className="flex justify-between gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 self-center" />
                      <div className="flex justify-between gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      </div>
                    </div>
                  </div>

                  {/* Tile 3: [5|3] Vertical */}
                  <div
                    onClick={() => sounds.playDominoClick()}
                    className="w-9 h-18 rounded-lg bg-stone-100 border border-stone-300 shadow-md p-1 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex flex-col justify-between h-7 py-0.5">
                      <div className="flex justify-between">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 self-center" />
                      <div className="flex justify-between">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      </div>
                    </div>
                    <div className="h-[1px] bg-stone-400" />
                    <div className="flex flex-col justify-between h-7 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 self-center" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 self-end" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 text-[10px] text-amber-300 font-bold tracking-wide">
                  Real Multiplayer Domino Strategy
                </div>
              </div>

              {/* DOMINO Feature Tags */}
              <div className="w-full mt-3 flex flex-wrap justify-center gap-1.5 px-2">
                {['2 & 4 Players', 'Draw Game', 'All Five'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectedSubmode(mode);
                      sounds.playClick();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedSubmode === mode
                        ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* JACKAROO MODE */}
          {activeGame === 'jackaroo' && (
            <motion.div
              key="jackaroo"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col items-center"
            >
              {/* Jackaroo Card Battle Board */}
              <div className="relative w-full max-w-xs h-48 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-3 border-2 border-blue-500/40 shadow-[0_15px_35px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center">
                {/* Interactive Card Hand */}
                <div className="flex items-center -space-x-3">
                  {[
                    { card: 'J', suit: '♠', color: 'text-slate-900', label: 'Jack swap' },
                    { card: '7', suit: '♦', color: 'text-red-600', label: 'Split moves' },
                    { card: 'K', suit: '♥', color: 'text-red-600', label: 'Base exit' },
                    { card: '4', suit: '♣', color: 'text-slate-900', label: 'Backward 4' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -8, scale: 1.05 }}
                      onClick={() => sounds.playClick()}
                      className="w-12 h-18 rounded-xl bg-white border border-slate-300 shadow-lg p-1.5 flex flex-col justify-between cursor-pointer"
                    >
                      <div className={`text-xs font-bold ${item.color} leading-none`}>
                        {item.card}
                        <span className="block text-[10px]">{item.suit}</span>
                      </div>
                      <div className={`text-base font-bold text-center ${item.color}`}>
                        {item.suit}
                      </div>
                      <div className={`text-xs font-bold ${item.color} leading-none rotate-180 self-end`}>
                        {item.card}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-2 text-xs font-bold text-blue-300">
                  Fast-paced card tactics with friends & teams
                </div>
              </div>

              {/* JACKAROO Feature Tags */}
              <div className="w-full mt-3 flex flex-wrap justify-center gap-1.5 px-2">
                {['Basic', 'Complex', 'Quick', 'Team Synergy', 'Voice Stickers'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSelectedSubmode(mode);
                      sounds.playClick();
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedSubmode === mode
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode highlights footer summary */}
      <div className="relative z-10 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-center text-xs text-slate-300">
        <span className="text-amber-400 font-bold">✨ Expressive Game Reactions:</span> Custom stickers, team emotes, and tactical board tools!
      </div>
    </div>
  );
};
