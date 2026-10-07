import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Download, CheckCircle, ShieldCheck, Share2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  const startInstall = () => {
    sounds.playChestOpen();
    setIsInstalling(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          setIsInstalled(true);
          sounds.playVipFanfare();
          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header App Details */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-1 shadow-lg border border-yellow-200/50 shrink-0">
            <div className="w-full h-full rounded-xl bg-slate-950 flex flex-col items-center justify-center">
              <span className="text-3xl">🎲</span>
              <span className="text-[9px] font-black tracking-widest text-amber-300 -mt-1 uppercase">YALLA</span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-display font-extrabold text-white flex items-center gap-1.5">
              <span>Yalla Ludo - Voice Chat</span>
            </h3>
            <span className="text-xs text-amber-400 font-semibold block mt-0.5">
              Aviva Sun • Board Games & Social
            </span>

            <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                4.8 ★
              </span>
              <span>·</span>
              <span className="font-semibold">100M+ DLs</span>
              <span>·</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-300">
                12+
              </span>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Size</span>
            <span className="font-display font-bold text-sm text-white">168 MB</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Audio</span>
            <span className="font-display font-bold text-sm text-emerald-400">Live Voice</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Games</span>
            <span className="font-display font-bold text-sm text-amber-400">3-in-1</span>
          </div>
        </div>

        {/* Download State Action */}
        <div className="mt-5">
          {!isInstalled ? (
            <div>
              {isInstalling ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-amber-400">Downloading Yalla Ludo assets...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <button
                  onClick={startInstall}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-display font-black text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shimmer-effect"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>INSTALL FREE ON DEVICE</span>
                </button>
              )}
            </div>
          ) : (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>Installed & Ready to Play!</span>
              </div>
              <button
                onClick={() => {
                  sounds.playDiceRoll();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer"
              >
                Launch Game
              </button>
            </div>
          )}
        </div>

        {/* Trust markers */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Safe
          </span>
          <span>·</span>
          <span>Official Release</span>
          <span>·</span>
          <span>Supports iOS & Android</span>
        </div>
      </motion.div>
    </div>
  );
};
