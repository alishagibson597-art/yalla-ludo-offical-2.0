import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, MessageSquare, Heart, Smile, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

const VOICE_SCENE_IMAGE = '/src/assets/images/yalla_voice_chat_scene_1791375052476.jpg';

interface VoicePlayer {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatarBg: string;
  initials: string;
  isSpeaking: boolean;
  phrase: string;
}

const PLAYERS_DATA: VoicePlayer[] = [
  {
    id: 'p1',
    name: 'Tariq',
    country: 'UAE',
    flag: '🇦🇪',
    avatarBg: 'from-blue-500 to-indigo-600',
    initials: 'TA',
    isSpeaking: true,
    phrase: '“Roll a 6 brother! Let’s get that pawn out! 🎲”',
  },
  {
    id: 'p2',
    name: 'Layla',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    avatarBg: 'from-rose-500 to-pink-600',
    initials: 'LA',
    isSpeaking: false,
    phrase: '“Haha nice block! Let’s play team mode next! 😂”',
  },
  {
    id: 'p3',
    name: 'Omar',
    country: 'Egypt',
    flag: '🇪🇬',
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'OM',
    isSpeaking: false,
    phrase: '“Yalla double five! Don’t give up! 🀄”',
  },
  {
    id: 'p4',
    name: 'Nour',
    country: 'Morocco',
    flag: '🇲🇦',
    avatarBg: 'from-emerald-500 to-teal-600',
    initials: 'NR',
    isSpeaking: false,
    phrase: '“Sending you a luxury sports car! 🏎️💨”',
  },
];

export const VoiceChatScene: React.FC = () => {
  const [players, setPlayers] = useState<VoicePlayer[]>(PLAYERS_DATA);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>('p1');
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);

  // Automatically cycle active speaking player to feel alive during ad playback
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) => {
        const nextIdx = Math.floor(Math.random() * prev.length);
        const nextId = prev[nextIdx].id;
        setActiveSpeakerId(nextId);
        sounds.playVoiceWave();
        return prev.map((p) => ({
          ...p,
          isSpeaking: p.id === nextId,
        }));
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleSpeakerTap = (id: string) => {
    setActiveSpeakerId(id);
    sounds.playVoiceWave();
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        isSpeaking: p.id === id,
      }))
    );
  };

  const handleAddReaction = (emoji: string) => {
    sounds.playClick();
    const newId = Date.now() + Math.random();
    setReactions((prev) => [...prev, { id: newId, emoji, x: Math.random() * 60 + 20 }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== newId));
    }, 1800);
  };

  const activePlayer = players.find((p) => p.id === activeSpeakerId) || players[0];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={VOICE_SCENE_IMAGE}
          alt="Voice Chat Room"
          className="w-full h-full object-cover object-center opacity-35 filter blur-xs saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
      </div>

      {/* Floating Reaction Emojis */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {reactions.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 1, y: 350, scale: 0.8 }}
              animate={{ opacity: 0, y: 80, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ left: `${r.x}%` }}
              className="absolute text-2xl select-none"
            >
              {r.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg mb-1.5"
        >
          <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Real-Time HD Audio</span>
        </motion.div>

        {/* SECTION 1 TITLE */}
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
          <span>🎙️</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300">
            VOICE CHAT WITH FRIENDS
          </span>
        </h2>

        {/* PROMPT COPY */}
        <p className="text-xs sm:text-sm text-slate-200/90 font-medium max-w-xs mt-1 leading-snug">
          “Talk, laugh, share tips and make new friends while playing!”
        </p>
      </div>

      {/* Center Voice Chat Board Visualizer */}
      <div className="relative z-10 my-auto flex flex-col items-center w-full max-w-sm mx-auto">
        {/* Active Speech Bubble */}
        <motion.div
          key={activePlayer.id}
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-indigo-400/40 shadow-[0_10px_25px_rgba(79,70,229,0.3)] mb-4 text-center"
        >
          <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <span>{activePlayer.flag}</span>
              <span>{activePlayer.name} ({activePlayer.country})</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Speaking
            </span>
          </div>
          <p className="text-white font-medium text-sm sm:text-base italic drop-shadow-sm">
            {activePlayer.phrase}
          </p>

          {/* Sound wave visualizer bars */}
          <div className="flex items-center justify-center gap-1 mt-2.5 h-5">
            {[40, 75, 95, 60, 100, 85, 55, 90, 70, 45].map((height, i) => (
              <motion.span
                key={i}
                animate={{
                  height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                }}
                transition={{
                  duration: 0.6 + (i % 3) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-300 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* 4 Interactive Player Avatars in Quad Layout */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {players.map((player) => {
            const isSpeaking = player.id === activeSpeakerId;
            return (
              <motion.div
                key={player.id}
                onClick={() => handleSpeakerTap(player.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`cursor-pointer p-2.5 rounded-2xl flex items-center gap-2.5 transition-all border ${
                  isSpeaking
                    ? 'bg-gradient-to-r from-emerald-950/80 to-slate-900/90 border-emerald-400/70 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-700/60'
                }`}
              >
                {/* Avatar with glowing ring when speaking */}
                <div className="relative">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${player.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md border-2 ${
                      isSpeaking ? 'border-emerald-300 ring-4 ring-emerald-500/30' : 'border-slate-700'
                    }`}
                  >
                    {player.initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-xs">{player.flag}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate">{player.name}</span>
                    {isSpeaking ? (
                      <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                    ) : (
                      <MicOff className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">{player.country}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Voice Chat Reactions Bar */}
        <div className="flex items-center justify-between w-full mt-3 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/50">
          <span className="text-[11px] text-slate-400 font-medium">Quick reaction:</span>
          <div className="flex items-center gap-2">
            {['❤️', '😂', '🔥', '🎲', '🏎️'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleAddReaction(emoji)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-sm transform hover:scale-125 active:scale-95 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Bullet Points footer */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80 text-center">
        <div className="flex flex-col items-center p-1 bg-slate-900/40 rounded-lg">
          <span className="text-[11px] font-bold text-white">Zero Lag</span>
          <span className="text-[9px] text-slate-400">Ultra-low latency</span>
        </div>
        <div className="flex flex-col items-center p-1 bg-slate-900/40 rounded-lg">
          <span className="text-[11px] font-bold text-emerald-400">Noise Mute</span>
          <span className="text-[9px] text-slate-400">AI audio filtering</span>
        </div>
        <div className="flex flex-col items-center p-1 bg-slate-900/40 rounded-lg">
          <span className="text-[11px] font-bold text-cyan-400">Hands-Free</span>
          <span className="text-[9px] text-slate-400">Talk while rolling</span>
        </div>
      </div>
    </div>
  );
};
