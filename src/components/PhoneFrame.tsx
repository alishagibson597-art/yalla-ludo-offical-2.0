import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  appTitle?: string;
  showStatusBar?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
  appTitle = 'Yalla Ludo',
  showStatusBar = true,
}) => {
  return (
    <div
      className={`relative mx-auto rounded-[46px] p-[10px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(234,179,8,0.18)] border border-slate-600/60 ${className}`}
      style={{
        boxShadow:
          '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 50px rgba(245, 158, 11, 0.15), inset 0 0 2px 1px rgba(255,255,255,0.2)',
      }}
    >
      {/* Phone side buttons */}
      <div className="absolute -left-[13px] top-28 w-[3px] h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -left-[13px] top-44 w-[3px] h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -right-[13px] top-32 w-[3px] h-16 bg-slate-700 rounded-r-md" />

      {/* Screen container */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-slate-950 flex flex-col border border-slate-800">
        {/* Dynamic Island / Top notch */}
        {showStatusBar && (
          <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-2 bg-gradient-to-b from-black/80 to-transparent text-[11px] font-semibold text-white/90 select-none">
            <span>09:41</span>
            
            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 h-5 w-24 bg-black rounded-full flex items-center justify-end px-2 border border-white/10 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 flex items-center justify-center mr-1">
                <div className="w-1 h-1 rounded-full bg-indigo-400" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>
        )}

        {/* In-app header brand bar */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-red-600/90 text-white shadow-md border-b border-amber-400/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-300 to-yellow-500 flex items-center justify-center font-black text-slate-950 text-xs shadow-inner">
              🎲
            </div>
            <span className="font-display font-extrabold text-sm tracking-wide drop-shadow-sm">
              {appTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-amber-300/30 text-amber-200">
              <span>🪙</span>
              <span className="tabular-nums">1,280,000</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-cyan-300/30 text-cyan-200">
              <span>💎</span>
              <span className="tabular-nums">8,450</span>
            </div>
          </div>
        </div>

        {/* Screen inner content */}
        <div className="relative flex-1 overflow-hidden flex flex-col bg-slate-950">
          {children}
        </div>

        {/* Home indicator bar */}
        <div className="relative z-30 flex justify-center py-2 bg-gradient-to-t from-black/90 to-transparent">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
