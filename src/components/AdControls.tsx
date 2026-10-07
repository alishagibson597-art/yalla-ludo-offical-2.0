import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Music, 
  Maximize2, 
  Sparkles,
  Smartphone,
  Tv,
  Square,
  Gamepad2
} from 'lucide-react';
import { SceneId, AspectRatioType } from '../types';
import { sounds } from '../utils/audio';

interface AdControlsProps {
  scenes: { id: SceneId; label: string }[];
  currentSceneIdx: number;
  progressPercent: number;
  isPlaying: boolean;
  isMuted: boolean;
  isBgmActive: boolean;
  isInteractiveMode: boolean;
  aspectRatio: AspectRatioType;
  showPhoneBezel: boolean;
  onSelectScene: (idx: number) => void;
  onTogglePlay: () => void;
  onNextScene: () => void;
  onPrevScene: () => void;
  onToggleMute: () => void;
  onToggleBgm: () => void;
  onToggleInteractiveMode: () => void;
  onSetAspectRatio: (ratio: AspectRatioType) => void;
  onTogglePhoneBezel: () => void;
  onToggleFullscreen: () => void;
}

export const AdControls: React.FC<AdControlsProps> = ({
  scenes,
  currentSceneIdx,
  progressPercent,
  isPlaying,
  isMuted,
  isBgmActive,
  isInteractiveMode,
  aspectRatio,
  showPhoneBezel,
  onSelectScene,
  onTogglePlay,
  onNextScene,
  onPrevScene,
  onToggleMute,
  onToggleBgm,
  onToggleInteractiveMode,
  onSetAspectRatio,
  onTogglePhoneBezel,
  onToggleFullscreen,
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Top Story-Style Segmented Progress Bar */}
      <div className="w-full flex items-center gap-1.5 px-3 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800">
        {scenes.map((scene, idx) => {
          const isPast = idx < currentSceneIdx;
          const isCurrent = idx === currentSceneIdx;
          const widthVal = isPast ? '100%' : isCurrent ? `${progressPercent}%` : '0%';

          return (
            <button
              key={scene.id}
              onClick={() => {
                sounds.playClick();
                onSelectScene(idx);
              }}
              title={scene.label}
              className="flex-1 group py-1 flex flex-col gap-1 cursor-pointer"
            >
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden transition-all group-hover:h-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-100 ease-linear rounded-full"
                  style={{ width: widthVal }}
                />
              </div>
              <span
                className={`text-[10px] font-bold text-center truncate block transition-colors ${
                  isCurrent ? 'text-amber-300' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              >
                {scene.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Director Control Deck */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-slate-200 shadow-xl">
        {/* Playback Controls (Left) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sounds.playClick();
              onPrevScene();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Previous Section"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause Ad</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Ad</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onNextScene();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Next Section"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Controls & Interactive Mode (Center) */}
        <div className="flex items-center gap-2">
          {/* Sound FX Mute toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isMuted
                ? 'bg-red-950/60 border-red-800/80 text-red-400'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
            }`}
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound FX'}</span>
          </button>

          {/* BGM Toggle */}
          <button
            onClick={onToggleBgm}
            className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
              isBgmActive
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Commercial BGM Beat"
          >
            <Music className={`w-4 h-4 ${isBgmActive ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">BGM Track</span>
          </button>

          {/* Playable Ad Mode Toggle */}
          <button
            onClick={onToggleInteractiveMode}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isInteractiveMode
                ? 'bg-indigo-600/30 border-indigo-500/80 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Interactive Playable Ad elements"
          >
            <Gamepad2 className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Playable Ad</span>
          </button>
        </div>

        {/* Format Selector: 9:16 Vertical, 1:1, 16:9 (Right) */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700">
            <button
              onClick={() => onSetAspectRatio('9:16')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                aspectRatio === '9:16'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="9:16 Vertical Commercial (TikTok / Reels / Shorts)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[10px]">9:16</span>
            </button>

            <button
              onClick={() => onSetAspectRatio('1:1')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                aspectRatio === '1:1'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="1:1 Square Post (Instagram / Facebook)"
            >
              <Square className="w-3.5 h-3.5" />
              <span className="text-[10px]">1:1</span>
            </button>

            <button
              onClick={() => onSetAspectRatio('16:9')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                aspectRatio === '16:9'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="16:9 Widescreen Broadcast"
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="text-[10px]">16:9</span>
            </button>
          </div>

          {/* Phone Frame Toggle */}
          <button
            onClick={onTogglePhoneBezel}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              showPhoneBezel
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Smartphone Mockup Bezel"
          >
            <Smartphone className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
