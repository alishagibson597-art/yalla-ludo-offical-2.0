import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Play, Star, Sparkles, Smartphone, CheckCircle, QrCode } from 'lucide-react';
import { sounds } from '../../utils/audio';

const HERO_BG = '/src/assets/images/yalla_ludo_hero_cinematic_1791375036147.jpg';

interface FinalCtaSceneProps {
  onDownloadClick?: () => void;
  onReplay?: () => void;
}

export const FinalCtaScene: React.FC<FinalCtaSceneProps> = ({
  onDownloadClick,
  onReplay,
}) => {
  const [showQr, setShowQr] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden bg-slate-950">
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Yalla Ludo Final Scene"
          className="w-full h-full object-cover object-center opacity-45 scale-105 filter saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/25 blur-3xl pointer-events-none" />
      </div>

      {/* Floating Sparkles & Light Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            className="absolute text-amber-300 text-lg"
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Top Brand Logo */}
      <div className="relative z-20 flex flex-col items-center text-center pt-2">
        {/* App Icon Lockup */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-1 shadow-[0_15px_35px_rgba(245,158,11,0.6)] border-2 border-yellow-200 flex items-center justify-center mb-2"
        >
          <div className="w-full h-full rounded-xl bg-slate-950 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl">🎲</span>
            <span className="text-[9px] font-black tracking-widest text-amber-300 -mt-1 uppercase">YALLA</span>
          </div>
        </motion.div>

        {/* FINAL TEXT HEADLINE */}
        <h1 className="text-3xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.7)] flex items-center justify-center gap-1.5">
          <span>🎲</span>
          <span>YALLA LUDO</span>
        </h1>

        <div className="text-sm sm:text-base font-extrabold tracking-widest text-amber-200 uppercase mt-0.5">
          PLAY • CHAT • CONNECT
        </div>

        {/* FINAL TEXT PROMPT QUOTE */}
        <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xs mt-2 italic drop-shadow leading-snug">
          “Enjoy exciting games, meet new friends and create unforgettable moments!”
        </p>
      </div>

      {/* Center Phone Screen / Ratings Showcase */}
      <div className="relative z-20 my-auto flex flex-col items-center">
        {/* Rating and badges */}
        <div className="flex items-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400" />
          ))}
          <span className="text-white text-xs font-bold ml-1.5">4.8 / 5.0 (2.4M Reviews)</span>
        </div>

        {/* App Store / Google Play Buttons Row */}
        <div className="flex items-center gap-2.5 max-w-xs w-full justify-center">
          <button
            onClick={() => {
              sounds.playClick();
              onDownloadClick?.();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span className="text-xl">🍏</span>
            <div className="text-left">
              <span className="block text-[8px] text-slate-400 uppercase leading-none">Download on the</span>
              <span className="font-bold text-xs text-white leading-tight">App Store</span>
            </div>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onDownloadClick?.();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span className="text-xl">🤖</span>
            <div className="text-left">
              <span className="block text-[8px] text-slate-400 uppercase leading-none">Get it on</span>
              <span className="font-bold text-xs text-white leading-tight">Google Play</span>
            </div>
          </button>
        </div>

        {showQr && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-3 p-3 bg-white rounded-2xl shadow-2xl flex flex-col items-center"
          >
            <div className="w-28 h-28 bg-slate-900 rounded-lg flex items-center justify-center p-2">
              <div className="w-full h-full bg-white p-1 rounded grid grid-cols-6 gap-0.5">
                {[...Array(36)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i % 2 === 0 && i % 3 !== 0) || i < 7 || i > 28 ? 'bg-slate-950' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] text-slate-800 font-bold mt-1">Scan to Install on Mobile</span>
          </motion.div>
        )}
      </div>

      {/* Main Download CTA */}
      <div className="relative z-20 flex flex-col gap-2 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sounds.playChestOpen();
            onDownloadClick?.();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-display font-black text-lg tracking-wider shadow-[0_12px_35px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 cursor-pointer shimmer-effect border border-yellow-200"
        >
          <Download className="w-6 h-6 stroke-[2.5]" />
          <span>DOWNLOAD NOW — FREE</span>
        </motion.button>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{showQr ? 'Hide QR' : 'Show QR Code'}</span>
          </button>

          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            Instant Join
          </span>

          <button
            onClick={onReplay}
            className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer underline underline-offset-2"
          >
            Replay Ad ↺
          </button>
        </div>
      </div>
    </div>
  );
};
