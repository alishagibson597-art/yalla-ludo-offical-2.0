import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, Shield, Swords } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface JackarooCard {
  id: string;
  name: string;
  cardRank: string;
  suit: string;
  suitColor: string;
  power: string;
  description: string;
}

const CARDS: JackarooCard[] = [
  { id: 'c1', name: 'King Base Exit', cardRank: 'K', suit: '♥', suitColor: 'text-red-500', power: 'Exit Base or +13', description: 'Brings marble out or lunges 13 steps' },
  { id: 'c2', name: 'Jack Swap', cardRank: 'J', suit: '♠', suitColor: 'text-slate-900', power: 'Swap Marbles', description: 'Trade places with any opponent marble' },
  { id: 'c3', name: 'Seven Split', cardRank: '7', suit: '♦', suitColor: 'text-red-500', power: 'Split 7 Steps', description: 'Split movement between your team marbles' },
  { id: 'c4', name: 'Four Reverse', cardRank: '4', suit: '♣', suitColor: 'text-slate-900', power: 'Reverse 4 Steps', description: 'Step backward into shortcut lane' },
];

export const PlayableJackaroo: React.FC<{ onDownloadPrompt?: () => void }> = ({ onDownloadPrompt }) => {
  const [marblePos, setMarblePos] = useState<number>(0);
  const [opponentPos, setOpponentPos] = useState<number>(14);
  const [lastAction, setLastAction] = useState<string>('Select a card to strike!');
  const [reactionSticker, setReactionSticker] = useState<string | null>(null);

  const handlePlayCard = (card: JackarooCard) => {
    sounds.playClick();

    if (card.cardRank === 'K') {
      sounds.playPawnMove();
      setMarblePos((prev) => (prev + 13) % 28);
      setLastAction('King played! Lunged 13 steps forward!');
      triggerReaction('👑🔥');
    } else if (card.cardRank === 'J') {
      sounds.playCapture();
      // Swap!
      const temp = marblePos;
      setMarblePos(opponentPos);
      setOpponentPos(temp);
      setLastAction('JACK SWAP! Swapped places with opponent!');
      triggerReaction('🃏⚡');
    } else if (card.cardRank === '7') {
      sounds.playPawnMove();
      setMarblePos((prev) => (prev + 7) % 28);
      setLastAction('Split 7 played! Advanced forward!');
      triggerReaction('⚔️✨');
    } else if (card.cardRank === '4') {
      sounds.playPawnMove();
      setMarblePos((prev) => (prev - 4 + 28) % 28);
      setLastAction('Backward 4 played! Slipped into shortcut!');
      triggerReaction('🔄💨');
    }
  };

  const triggerReaction = (sticker: string) => {
    setReactionSticker(sticker);
    setTimeout(() => setReactionSticker(null), 1800);
  };

  const handleReset = () => {
    sounds.playClick();
    setMarblePos(0);
    setOpponentPos(14);
    setLastAction('Select a card to strike!');
    setReactionSticker(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🏹</span>
          <div>
            <span className="font-display font-black text-xs sm:text-sm text-amber-300 block leading-tight">
              PLAYABLE JACKAROO
            </span>
            <span className="text-[10px] text-slate-400">Card-Driven Team Board Tactics</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          title="Restart Match"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Reaction Sticker */}
      <AnimatePresence>
        {reactionSticker && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1.2, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 z-40 text-4xl"
          >
            {reactionSticker}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action banner */}
      <div className="py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center text-xs font-semibold text-amber-300">
        {lastAction}
      </div>

      {/* Jackaroo Circular Board Track */}
      <div className="relative my-auto flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 mx-auto rounded-full bg-slate-900/90 border-2 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.25)] p-3">
        {/* Track Nodes */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * (2 * Math.PI);
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const isUserHere = Math.floor((marblePos / 28) * 20) === i;
          const isOpponentHere = Math.floor((opponentPos / 28) * 20) === i;

          return (
            <div
              key={i}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="absolute w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center"
            >
              {isUserHere && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-4 h-4 rounded-full bg-yellow-400 border border-white shadow-md flex items-center justify-center text-[8px] font-black text-slate-950"
                >
                  👑
                </motion.span>
              )}
              {isOpponentHere && !isUserHere && (
                <span className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-md flex items-center justify-center text-[8px] font-black text-white">
                  ⚔️
                </span>
              )}
            </div>
          );
        })}

        {/* Center Arena Badge */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-950 to-slate-900 border-2 border-indigo-400/60 flex flex-col items-center justify-center text-center p-1 shadow-inner">
          <span className="text-xl">🏹</span>
          <span className="text-[9px] font-black text-indigo-300 uppercase tracking-tighter">
            JACKAROO
          </span>
        </div>
      </div>

      {/* Hand Cards */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800/80">
        <span className="text-[11px] font-bold text-white">Tap a Card to Make Your Move:</span>
        <div className="grid grid-cols-4 gap-1.5">
          {CARDS.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePlayCard(card)}
              className="p-1.5 rounded-xl bg-white border border-slate-300 shadow-lg flex flex-col justify-between text-left cursor-pointer h-24"
            >
              <div className="flex justify-between items-start">
                <span className={`text-xs font-black ${card.suitColor}`}>
                  {card.cardRank}
                  <span className="block text-[10px] leading-none">{card.suit}</span>
                </span>
                <span className="text-[9px] font-bold text-slate-500">{card.cardRank}</span>
              </div>

              <div className="my-auto text-center">
                <span className={`text-base font-bold ${card.suitColor}`}>{card.suit}</span>
              </div>

              <span className="text-[8px] font-extrabold text-slate-900 leading-tight block truncate">
                {card.power}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
