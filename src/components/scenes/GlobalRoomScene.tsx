import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Gift, Mic, Sparkles, Send, Flame, Heart } from 'lucide-react';
import { sounds } from '../../utils/audio';

const VOICE_ROOM_BG = '/src/assets/images/yalla_voice_chat_scene_1791375052476.jpg';

interface RoomUser {
  id: string;
  name: string;
  country: string;
  flag: string;
  micNumber: number;
  isHost?: boolean;
}

const ROOM_USERS: RoomUser[] = [
  { id: '1', name: 'Al-Mansoor', country: 'UAE', flag: '🇦🇪', micNumber: 1, isHost: true },
  { id: '2', name: 'Fatima', country: 'Saudi Arabia', flag: '🇸🇦', micNumber: 2 },
  { id: '3', name: 'Zaid', country: 'Kuwait', flag: '🇰🇼', micNumber: 3 },
  { id: '4', name: 'Nadia', country: 'Morocco', flag: '🇲🇦', micNumber: 4 },
  { id: '5', name: 'Karim', country: 'Egypt', flag: '🇪🇬', micNumber: 5 },
  { id: '6', name: 'Chloe', country: 'USA', flag: '🇺🇸', micNumber: 6 },
];

const GIFTS_CATALOG = [
  { id: 'car', name: 'Supercar', icon: '🏎️', cost: '50,000', color: 'from-amber-400 to-red-500' },
  { id: 'falcon', name: 'Falcon', icon: '🦅', cost: '25,000', color: 'from-yellow-400 to-amber-600' },
  { id: 'palace', name: 'Palace', icon: '🏰', cost: '100,000', color: 'from-purple-400 to-indigo-600' },
  { id: 'ring', name: 'Diamond Ring', icon: '💍', cost: '15,000', color: 'from-cyan-300 to-blue-500' },
  { id: 'roses', name: 'Rose Storm', icon: '🌹', cost: '5,000', color: 'from-rose-400 to-pink-600' },
  { id: 'crown', name: 'Royal Crown', icon: '👑', cost: '30,000', color: 'from-yellow-300 to-amber-500' },
];

export const GlobalRoomScene: React.FC = () => {
  const [activeGiftAnim, setActiveGiftAnim] = useState<{
    icon: string;
    name: string;
    sender: string;
    recipient: string;
  } | null>(null);

  const handleSendGift = (gift: (typeof GIFTS_CATALOG)[0]) => {
    sounds.playGiftSend();
    setActiveGiftAnim({
      icon: gift.icon,
      name: gift.name,
      sender: 'VIP Player',
      recipient: 'Al-Mansoor',
    });

    setTimeout(() => {
      setActiveGiftAnim(null);
    }, 2400);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={VOICE_ROOM_BG}
          alt="Global Voice Room"
          className="w-full h-full object-cover object-center opacity-30 filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
      </div>

      {/* Screen-Wide Gift Animation Overlay */}
      <AnimatePresence>
        {activeGiftAnim && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none p-4"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -5, 0],
                scale: [0.8, 1.3, 1],
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-7xl sm:text-8xl drop-shadow-[0_0_40px_rgba(245,158,11,0.8)] filter"
            >
              {activeGiftAnim.icon}
            </motion.div>
            <div className="mt-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/90 to-yellow-600/90 border border-yellow-200 text-slate-950 font-display font-black text-center shadow-xl">
              <span className="block text-sm uppercase tracking-wider text-slate-900">
                ✨ LUXURY GIFT SENT! ✨
              </span>
              <span className="text-lg text-slate-950">{activeGiftAnim.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-1.5">
          <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '15s' }} />
          <span>Global Community Hub</span>
        </div>

        {/* SECTION 3 TITLE */}
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
          <span>🌎</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
            GLOBAL VOICE CHAT
          </span>
        </h2>

        {/* PROMPT COPY */}
        <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-xs mt-1 leading-snug">
          “Meet new people, chat freely, share ideas and enjoy fun moments together!”
        </p>
      </div>

      {/* Stage Avatars 6-Mic Grid */}
      <div className="relative z-10 my-auto w-full max-w-sm mx-auto">
        {/* Room Topic Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 rounded-xl border border-slate-700/60 mb-3 text-xs">
          <span className="flex items-center gap-1.5 text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Room: Dubai VIP Oasis #408
          </span>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            2.4M Hot
          </span>
        </div>

        {/* 6 Mic Seats */}
        <div className="grid grid-cols-3 gap-2.5">
          {ROOM_USERS.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => sounds.playVoiceWave()}
              className="cursor-pointer relative flex flex-col items-center p-2 rounded-2xl bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400/60 transition-all shadow-md group"
            >
              {/* Mic seat number */}
              <span className="absolute top-1 left-2 text-[10px] text-slate-500 font-bold">
                #{user.micNumber}
              </span>

              {/* Host Crown */}
              {user.isHost && (
                <span className="absolute -top-2 right-2 text-xs">👑</span>
              )}

              {/* Avatar circle */}
              <div className="relative mt-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-400/50 shadow-inner">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 text-xs">{user.flag}</span>
              </div>

              <span className="text-xs font-bold text-white mt-1.5 truncate max-w-[80px]">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                {user.country}
              </span>

              {/* Speaking indicator dot */}
              <div className="mt-1 flex items-center gap-0.5">
                <Mic className="w-3 h-3 text-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Virtual Gifts Tray (Interactive) */}
      <div className="relative z-10 flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-amber-300 font-bold flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" />
            Virtual Luxury Gifts:
          </span>
          <span className="text-[11px] text-slate-400">Tap to send gift!</span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/70 shadow-lg">
          {GIFTS_CATALOG.map((g) => (
            <motion.button
              key={g.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendGift(g)}
              className="flex flex-col items-center p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
              title={`Send ${g.name} (${g.cost} gold)`}
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{g.icon}</span>
              <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center mt-0.5">
                {g.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
