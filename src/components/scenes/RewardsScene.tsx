import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, CheckCircle2, ChevronRight, Coins, Gem, Award } from 'lucide-react';
import { sounds } from '../../utils/audio';

const REWARDS_BG = '/src/assets/images/yalla_rewards_chest_1791375086221.jpg';

interface RewardItem {
  id: string;
  name: string;
  icon: string;
  amount: string;
  badge: string;
  color: string;
}

const REWARDS_LIST: RewardItem[] = [
  { id: '1', name: 'Daily Tasks', icon: '🎁', amount: 'Claim 3/3', badge: 'Bonus', color: 'from-amber-500 to-orange-500' },
  { id: '2', name: 'Diamonds', icon: '💎', amount: '+500 Gems', badge: 'Rare', color: 'from-cyan-400 to-blue-600' },
  { id: '3', name: 'Gold', icon: '🪙', amount: '+150,000', badge: 'Free', color: 'from-yellow-400 to-amber-600' },
  { id: '4', name: 'Gifts', icon: '🎁', amount: 'Luxury Packs', badge: 'Social', color: 'from-rose-500 to-pink-600' },
  { id: '5', name: 'Skin Fragments', icon: '✨', amount: 'Dice & Boards', badge: 'Custom', color: 'from-purple-400 to-indigo-600' },
  { id: '6', name: 'Arrival Chests', icon: '🎉', amount: 'Tier 5 Chest', badge: 'Mega', color: 'from-emerald-400 to-teal-600' },
];

export const RewardsScene: React.FC = () => {
  const [chestOpened, setChestOpened] = useState<boolean>(false);
  const [unboxedLoot, setUnboxedLoot] = useState<string[]>([]);

  const handleOpenChest = () => {
    sounds.playChestOpen();
    setChestOpened(true);
    setUnboxedLoot(['+50,000 GOLD 🪙', '+200 DIAMONDS 💎', 'LEGENDARY DICE SKIN ✨']);
    setTimeout(() => {
      sounds.playCoinChime();
    }, 400);
  };

  const handleResetChest = () => {
    sounds.playClick();
    setChestOpened(false);
    setUnboxedLoot([]);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={REWARDS_BG}
          alt="Arrival Chest Rewards"
          className="w-full h-full object-cover object-center opacity-35 filter blur-xs saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Non-Stop Free Perks</span>
        </div>

        {/* SECTION 4 TITLE */}
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
          <span>🎁</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-400">
            DAILY ACTIVITIES & REWARDS
          </span>
        </h2>

        {/* PROMPT COPY */}
        <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-xs mt-1 leading-snug">
          “Complete activities, play games and discover exciting rewards every day!”
        </p>
      </div>

      {/* Center Interactive Chest Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center w-full max-w-sm mx-auto">
        <div className="relative flex flex-col items-center">
          {/* Interactive Chest Graphic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={chestOpened ? handleResetChest : handleOpenChest}
            className="cursor-pointer relative w-36 h-36 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 p-3 border-4 border-yellow-300 shadow-[0_20px_50px_rgba(245,158,11,0.6)] flex flex-col items-center justify-center text-center group"
          >
            <motion.div
              animate={chestOpened ? { y: -10, scale: 1.15 } : { y: [0, -6, 0] }}
              transition={{ repeat: chestOpened ? 0 : Infinity, duration: 2.5 }}
              className="text-6xl sm:text-7xl drop-shadow-xl"
            >
              {chestOpened ? '🎉' : '🎁'}
            </motion.div>

            <span className="text-xs font-black uppercase tracking-wider text-slate-950 mt-1 bg-yellow-300 px-2 py-0.5 rounded-full shadow-sm">
              {chestOpened ? 'TAP TO RE-SEAL' : 'TAP TO UNBOX CHEST'}
            </span>
          </motion.div>

          {/* Unboxed Loot Popover */}
          <AnimatePresence>
            {chestOpened && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-3 flex flex-col items-center gap-1.5 w-full"
              >
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 text-xs font-black uppercase tracking-wide">
                  ✨ Arrival Chest Unlocked! ✨
                </div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {unboxedLoot.map((item, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400/60 text-amber-300 text-xs font-bold shadow-md"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6 Key Rewards Grid from Prompt */}
        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          {REWARDS_LIST.map((reward) => (
            <div
              key={reward.id}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col items-center text-center shadow-sm hover:border-amber-400/40 transition-colors"
            >
              <span className="text-2xl mb-0.5">{reward.icon}</span>
              <span className="text-xs font-bold text-white leading-tight">
                {reward.name}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold mt-0.5">
                {reward.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="relative z-10 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-300">
        <span className="text-emerald-400 font-bold">100% Free Daily Claim</span> • Never run out of dice rolls and chips!
      </div>
    </div>
  );
};
