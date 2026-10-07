import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Crown, Star, Check, Sparkles, Shield, Users, Gem } from 'lucide-react';
import { sounds } from '../../utils/audio';

const VIP_IMAGE_BG = '/src/assets/images/yalla_vip_luxury_gold_1791375068352.jpg';

export const VipScene: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'knight' | 'baron'>('baron');

  const handleSelectTier = (tier: 'knight' | 'baron') => {
    setSelectedTier(tier);
    sounds.playVipFanfare();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={VIP_IMAGE_BG}
          alt="Yalla Ludo VIP"
          className="w-full h-full object-cover object-center opacity-40 filter blur-xs saturate-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      {/* Top Section Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-1.5">
          <Crown className="w-3.5 h-3.5 text-yellow-400" />
          <span>Exclusive Royal Club</span>
        </div>

        {/* SECTION 5 HEADLINE */}
        <h2 className="text-3xl sm:text-4xl font-royal font-black text-white flex items-center justify-center gap-2 drop-shadow-[0_4px_16px_rgba(245,158,11,0.6)]">
          <span>👑</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
            YALLA LUDO VIP
          </span>
        </h2>
        <p className="text-xs text-amber-100/90 font-medium mt-0.5">
          Unlock prestige status, royal rooms and luxury privileges
        </p>

        {/* Tier Selector Buttons */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/90 rounded-2xl border border-yellow-500/40 mt-3 w-full max-w-xs shadow-lg">
          <button
            onClick={() => handleSelectTier('knight')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedTier === 'knight'
                ? 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>⭐ KNIGHT</span>
          </button>

          <button
            onClick={() => handleSelectTier('baron')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              selectedTier === 'baron'
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span>👑 BARON</span>
          </button>
        </div>
      </div>

      {/* Center VIP Card Visuals */}
      <div className="relative z-10 my-auto flex flex-col items-center w-full max-w-sm mx-auto">
        <motion.div
          key={selectedTier}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full rounded-3xl p-4 sm:p-5 border-2 shadow-2xl relative overflow-hidden backdrop-blur-md ${
            selectedTier === 'baron'
              ? 'bg-gradient-to-b from-amber-950/70 via-slate-900/90 to-amber-950/90 border-yellow-400/80 shadow-[0_20px_50px_rgba(245,158,11,0.3)]'
              : 'bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950 border-slate-400/70 shadow-[0_20px_50px_rgba(148,163,184,0.2)]'
          }`}
        >
          {/* Card Top Pill & Price */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">{selectedTier === 'baron' ? '👑' : '⭐'}</span>
                <span className="font-royal text-lg font-bold text-white uppercase tracking-wider">
                  {selectedTier === 'baron' ? 'Baron Membership' : 'Knight Membership'}
                </span>
              </div>
              <span className="text-[11px] text-amber-200/80 block">Royal status & golden nameplate</span>
            </div>

            <div className="text-right">
              <span className="text-lg sm:text-xl font-display font-black text-amber-300 block">
                {selectedTier === 'baron' ? 'USD 39.99' : 'USD 11.99'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">/ Month</span>
            </div>
          </div>

          {/* Prompt-mandated Features List */}
          <div className="mt-3.5 space-y-2 text-xs sm:text-sm">
            {[
              'Free daily benefits',
              'Daily Golds & Diamonds',
              'VIP privileges & prestige badge',
              'Exclusive game rooms access',
              'Create your own VIP room',
              'Invite friends to play together',
            ].map((perk, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-200">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    selectedTier === 'baron' ? 'bg-amber-400 text-slate-950' : 'bg-slate-300 text-slate-950'
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-medium text-xs sm:text-sm">{perk}</span>
              </div>
            ))}
          </div>

          {/* Shimmer bar on card */}
          <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {selectedTier === 'baron' ? 'Max 5X daily gold multipliers' : '2X daily gold bonus'}
            </span>
            <span className="text-slate-400">Cancel anytime</span>
          </div>
        </motion.div>
      </div>

      {/* Mandatory Professional Disclaimer */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <p className="text-[10px] text-slate-400 italic font-normal">
          “Prices may vary by country and are subject to change.”
        </p>
      </div>
    </div>
  );
};
