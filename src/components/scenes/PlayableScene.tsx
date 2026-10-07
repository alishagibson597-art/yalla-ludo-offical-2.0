import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Dices, Layers, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { PlayableLudo } from '../gameplay/PlayableLudo';
import { PlayableDomino } from '../gameplay/PlayableDomino';
import { PlayableJackaroo } from '../gameplay/PlayableJackaroo';
import { sounds } from '../../utils/audio';

type ActiveMiniGame = 'ludo' | 'domino' | 'jackaroo';

interface PlayableSceneProps {
  onDownloadPrompt?: () => void;
}

export const PlayableScene: React.FC<PlayableSceneProps> = ({ onDownloadPrompt }) => {
  const [activeMiniGame, setActiveMiniGame] = useState<ActiveMiniGame>('ludo');

  const handleSelectGame = (game: ActiveMiniGame) => {
    setActiveMiniGame(game);
    sounds.playClick();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-slate-950">
      {/* Top Banner Tag */}
      <div className="relative z-20 flex items-center justify-between px-3 pt-2 pb-1 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300 uppercase tracking-wide">
            PLAYABLE ARENA — TRY BEFORE YOU DOWNLOAD!
          </span>
        </div>

        {/* 3 Game Quick Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => handleSelectGame('ludo')}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
              activeMiniGame === 'ludo'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🎲</span>
            <span>Ludo</span>
          </button>

          <button
            onClick={() => handleSelectGame('domino')}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
              activeMiniGame === 'domino'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🀄</span>
            <span>Domino</span>
          </button>

          <button
            onClick={() => handleSelectGame('jackaroo')}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
              activeMiniGame === 'jackaroo'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🏹</span>
            <span>Jackaroo</span>
          </button>
        </div>
      </div>

      {/* Main Mini-Game Canvas */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeMiniGame === 'ludo' && (
            <motion.div
              key="ludo-arena"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <PlayableLudo onDownloadPrompt={onDownloadPrompt} />
            </motion.div>
          )}

          {activeMiniGame === 'domino' && (
            <motion.div
              key="domino-arena"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <PlayableDomino onDownloadPrompt={onDownloadPrompt} />
            </motion.div>
          )}

          {activeMiniGame === 'jackaroo' && (
            <motion.div
              key="jackaroo-arena"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <PlayableJackaroo onDownloadPrompt={onDownloadPrompt} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
