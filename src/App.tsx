import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Download, 
  Play, 
  RotateCcw, 
  Layers, 
  Mic, 
  Crown, 
  Gift, 
  Globe, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Star,
  Gamepad2,
  Dices
} from 'lucide-react';
import { PhoneFrame } from './components/PhoneFrame';
import { FloatingGameElements } from './components/FloatingGameElements';
import { HeroScene } from './components/scenes/HeroScene';
import { PlayableScene } from './components/scenes/PlayableScene';
import { VoiceChatScene } from './components/scenes/VoiceChatScene';
import { GameModesScene } from './components/scenes/GameModesScene';
import { GlobalRoomScene } from './components/scenes/GlobalRoomScene';
import { RewardsScene } from './components/scenes/RewardsScene';
import { VipScene } from './components/scenes/VipScene';
import { FinalCtaScene } from './components/scenes/FinalCtaScene';
import { PlayableLudo } from './components/gameplay/PlayableLudo';
import { PlayableDomino } from './components/gameplay/PlayableDomino';
import { PlayableJackaroo } from './components/gameplay/PlayableJackaroo';
import { AdControls } from './components/AdControls';
import { DownloadModal } from './components/DownloadModal';
import { SceneId, AspectRatioType, SceneMeta } from './types';
import { sounds } from './utils/audio';

const SCENES: SceneMeta[] = [
  {
    id: 'intro',
    label: 'Intro',
    badge: '01. Intro',
    durationMs: 7000,
    headline: '🎲 YALLA LUDO',
    subheadline: '“Play • Chat • Connect • Enjoy”',
  },
  {
    id: 'gameplay',
    label: 'Play Game',
    badge: '02. Playable Arena',
    durationMs: 18000, // Generous time for user to roll and interact!
    headline: '🕹️ PLAYABLE LUDO ARENA',
    subheadline: '“Roll the dice, move your pawns and play right now in this ad!”',
  },
  {
    id: 'voice_chat',
    label: 'Voice Chat',
    badge: '03. Voice Chat',
    durationMs: 7500,
    headline: '🎙️ VOICE CHAT WITH FRIENDS',
    subheadline: '“Talk, laugh, share tips and make new friends while playing!”',
  },
  {
    id: 'game_modes',
    label: 'Game Modes',
    badge: '04. Multiple Modes',
    durationMs: 8000,
    headline: '🎮 LUDO • DOMINO • JACKAROO',
    subheadline: '2 & 4 Players, Team Mode, Magic Tools & Classic Rules',
  },
  {
    id: 'global_room',
    label: 'Global Hub',
    badge: '05. Global Chat',
    durationMs: 7500,
    headline: '🌎 GLOBAL VOICE CHAT',
    subheadline: '“Meet new people, chat freely, share ideas and enjoy fun moments together!”',
  },
  {
    id: 'rewards',
    label: 'Rewards',
    badge: '06. Daily Chests',
    durationMs: 7500,
    headline: '🎁 DAILY ACTIVITIES & REWARDS',
    subheadline: '“Complete activities, play games and discover exciting rewards every day!”',
  },
  {
    id: 'vip',
    label: 'VIP Club',
    badge: '07. Royal VIP',
    durationMs: 7500,
    headline: '👑 YALLA LUDO VIP',
    subheadline: 'Knight ($11.99/mo) & Baron ($39.99/mo) with Exclusive Privileges',
  },
  {
    id: 'cta',
    label: 'Play Now',
    badge: '08. Download',
    durationMs: 9000,
    headline: '🎲 PLAY • CHAT • CONNECT',
    subheadline: '“Enjoy exciting games, meet new friends and create unforgettable moments!”',
  },
];

export default function App() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [sceneElapsedMs, setSceneElapsedMs] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [isInteractiveMode, setIsInteractiveMode] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');
  const [showPhoneBezel, setShowPhoneBezel] = useState<boolean>(true);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [activeTabFilter, setActiveTabFilter] = useState<'gameplay' | 'commercial' | 'features'>('gameplay');
  const [arenaGameSelect, setArenaGameSelect] = useState<'ludo' | 'domino' | 'jackaroo'>('ludo');

  const containerRef = useRef<HTMLDivElement>(null);
  const currentScene = SCENES[currentSceneIdx];

  // Auto progression timer
  useEffect(() => {
    if (!isPlaying) return;

    const tickMs = 50;
    const timer = setInterval(() => {
      setSceneElapsedMs((prev) => {
        const next = prev + tickMs;
        if (next >= currentScene.durationMs) {
          // Advance to next scene or loop
          setCurrentSceneIdx((idx) => {
            const nextIdx = (idx + 1) % SCENES.length;
            if (nextIdx === 0) {
              sounds.playCoinChime();
            } else if (nextIdx === 6) {
              sounds.playVipFanfare();
            } else {
              sounds.playVoiceWave();
            }
            return nextIdx;
          });
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIdx, currentScene.durationMs]);

  const handleSelectScene = (idx: number) => {
    setCurrentSceneIdx(idx);
    setSceneElapsedMs(0);
    sounds.playClick();
  };

  const handleNextScene = () => {
    setCurrentSceneIdx((idx) => (idx + 1) % SCENES.length);
    setSceneElapsedMs(0);
    sounds.playClick();
  };

  const handlePrevScene = () => {
    setCurrentSceneIdx((idx) => (idx - 1 + SCENES.length) % SCENES.length);
    setSceneElapsedMs(0);
    sounds.playClick();
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    sounds.playClick();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.setMuted(nextMuted);
  };

  const handleToggleBgm = () => {
    if (isMuted) {
      setIsMuted(false);
      sounds.setMuted(false);
    }
    const state = sounds.toggleBgm();
    setIsBgmActive(state);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const progressPercent = Math.min(100, (sceneElapsedMs / currentScene.durationMs) * 100);

  // Aspect ratio wrapper styles
  const getContainerDimensions = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'w-full max-w-[420px] aspect-[9/16] h-[780px] max-h-[85vh]';
      case '1:1':
        return 'w-full max-w-[580px] aspect-square max-h-[80vh]';
      case '16:9':
        return 'w-full max-w-[920px] aspect-[16/9] max-h-[75vh]';
      default:
        return 'w-full max-w-[420px] aspect-[9/16] h-[780px] max-h-[85vh]';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Universal Top Bar Contract (1 row, 3 zones) */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Zone 1: Single text element wordmark in display face */}
          <a href="#" className="flex items-center gap-2 font-display text-lg sm:text-xl font-black text-amber-400 tracking-tight hover:text-amber-300 transition-colors">
            <span>🎲</span>
            <span>YALLA LUDO</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-300">
            <button
              onClick={() => handleSelectScene(0)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentSceneIdx === 0 ? 'text-amber-400' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleSelectScene(1)}
              className={`flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer ${
                currentSceneIdx === 1 ? 'text-emerald-400' : ''
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Play Game</span>
            </button>
            <button
              onClick={() => handleSelectScene(2)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentSceneIdx === 2 ? 'text-amber-400' : ''
              }`}
            >
              Voice Chat
            </button>
            <button
              onClick={() => handleSelectScene(3)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentSceneIdx === 3 ? 'text-amber-400' : ''
              }`}
            >
              Game Modes
            </button>
            <button
              onClick={() => handleSelectScene(4)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentSceneIdx === 4 ? 'text-amber-400' : ''
              }`}
            >
              Global Hub
            </button>
            <button
              onClick={() => handleSelectScene(6)}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                currentSceneIdx === 6 ? 'text-amber-400' : ''
              }`}
            >
              VIP Club
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                handleSelectScene(1);
                setIsPlaying(false); // Pause so user can play freely!
              }}
              className="py-2 px-3.5 text-xs sm:text-sm font-display font-extrabold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-emerald-400" />
              <span>PLAY DEMO</span>
            </button>

            <button
              onClick={() => {
                sounds.playDiceRoll();
                setIsDownloadModalOpen(true);
              }}
              className="py-2 px-4 text-xs sm:text-sm font-display font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95 shimmer-effect"
            >
              DOWNLOAD NOW
            </button>
          </div>
        </div>
      </header>

      {/* Main Commercial Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Ad Title & Format Notice */}
        <div className="w-full max-w-2xl text-center mb-3">
          <div className="inline-flex items-center gap-2 text-xs text-amber-400/90 font-bold uppercase tracking-wider mb-1">
            <span>OFFICIAL COMMERCIAL PROMOTION</span>
            <span>·</span>
            <span>9:16 VERTICAL FULL HD FORMAT</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-white">
            {currentScene.headline}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
            {currentScene.subheadline}
          </p>
        </div>

        {/* Center Screen Mockup Frame */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center w-full my-auto transition-all duration-300"
        >
          {/* Ambient Volumetric Backdrop Lighting */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-500/15 via-red-500/10 to-indigo-600/15 blur-3xl pointer-events-none" />

          {/* Floating Game Elements (Pawns, Dice, Dominos, Cards, Mic, Bubbles) */}
          <FloatingGameElements
            interactive={isInteractiveMode}
            onDiceClick={() => sounds.playDiceRoll()}
          />

          {/* Smartphone Mockup or Borderless Video Container */}
          <div className={`${getContainerDimensions()} relative z-10 transition-all duration-300`}>
            {showPhoneBezel ? (
              <PhoneFrame
                appTitle="Yalla Ludo"
                className="w-full h-full"
                showStatusBar={true}
              >
                {/* Scene Renderer */}
                <div className="relative w-full h-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* Scene 0: Intro */}
                    {currentSceneIdx === 0 && (
                      <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                      >
                        <HeroScene
                          onExploreModes={() => handleSelectScene(3)}
                          onDownloadClick={() => setIsDownloadModalOpen(true)}
                          onPlayNow={() => {
                            handleSelectScene(1);
                            setIsPlaying(false);
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Scene 1: Playable Game Arena */}
                    {currentSceneIdx === 1 && (
                      <motion.div
                        key="gameplay"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <PlayableScene onDownloadPrompt={() => setIsDownloadModalOpen(true)} />
                      </motion.div>
                    )}

                    {/* Scene 2: Voice Chat with Friends */}
                    {currentSceneIdx === 2 && (
                      <motion.div
                        key="voice_chat"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <VoiceChatScene />
                      </motion.div>
                    )}

                    {/* Scene 3: Game Modes */}
                    {currentSceneIdx === 3 && (
                      <motion.div
                        key="game_modes"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <GameModesScene />
                      </motion.div>
                    )}

                    {/* Scene 4: Global Room */}
                    {currentSceneIdx === 4 && (
                      <motion.div
                        key="global_room"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <GlobalRoomScene />
                      </motion.div>
                    )}

                    {/* Scene 5: Rewards */}
                    {currentSceneIdx === 5 && (
                      <motion.div
                        key="rewards"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <RewardsScene />
                      </motion.div>
                    )}

                    {/* Scene 6: VIP Club */}
                    {currentSceneIdx === 6 && (
                      <motion.div
                        key="vip"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full"
                      >
                        <VipScene />
                      </motion.div>
                    )}

                    {/* Scene 7: CTA Download */}
                    {currentSceneIdx === 7 && (
                      <motion.div
                        key="cta"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                      >
                        <FinalCtaScene
                          onDownloadClick={() => setIsDownloadModalOpen(true)}
                          onReplay={() => handleSelectScene(0)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </PhoneFrame>
            ) : (
              /* Borderless Screen Presentation */
              <div className="w-full h-full rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {currentSceneIdx === 0 && (
                    <HeroScene
                      onExploreModes={() => handleSelectScene(3)}
                      onDownloadClick={() => setIsDownloadModalOpen(true)}
                      onPlayNow={() => {
                        handleSelectScene(1);
                        setIsPlaying(false);
                      }}
                    />
                  )}
                  {currentSceneIdx === 1 && (
                    <PlayableScene onDownloadPrompt={() => setIsDownloadModalOpen(true)} />
                  )}
                  {currentSceneIdx === 2 && <VoiceChatScene />}
                  {currentSceneIdx === 3 && <GameModesScene />}
                  {currentSceneIdx === 4 && <GlobalRoomScene />}
                  {currentSceneIdx === 5 && <RewardsScene />}
                  {currentSceneIdx === 6 && <VipScene />}
                  {currentSceneIdx === 7 && (
                    <FinalCtaScene
                      onDownloadClick={() => setIsDownloadModalOpen(true)}
                      onReplay={() => handleSelectScene(0)}
                    />
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Commercial Director Timeline & Controls Deck */}
        <div className="w-full max-w-3xl mt-5">
          <AdControls
            scenes={SCENES}
            currentSceneIdx={currentSceneIdx}
            progressPercent={progressPercent}
            isPlaying={isPlaying}
            isMuted={isMuted}
            isBgmActive={isBgmActive}
            isInteractiveMode={isInteractiveMode}
            aspectRatio={aspectRatio}
            showPhoneBezel={showPhoneBezel}
            onSelectScene={handleSelectScene}
            onTogglePlay={handleTogglePlay}
            onNextScene={handleNextScene}
            onPrevScene={handlePrevScene}
            onToggleMute={handleToggleMute}
            onToggleBgm={handleToggleBgm}
            onToggleInteractiveMode={() => setIsInteractiveMode(!isInteractiveMode)}
            onSetAspectRatio={(ratio) => setAspectRatio(ratio)}
            onTogglePhoneBezel={() => setShowPhoneBezel(!showPhoneBezel)}
            onToggleFullscreen={handleToggleFullscreen}
          />
        </div>

        {/* Dedicated Expanded Gameplay Arena Section */}
        <section className="w-full max-w-4xl mt-10 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4" />
                <span>Interactive Gameplay Arena</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-1">
                Play Yalla Ludo Right Now!
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Roll the dice, knock out opponent pawns, drop Dominoes, or test Jackaroo tactics.
              </p>
            </div>

            {/* Segmented Game Selection Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setActiveTabFilter('gameplay');
                  setArenaGameSelect('ludo');
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === 'gameplay' && arenaGameSelect === 'ludo'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🎲</span>
                <span>Play Ludo</span>
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter('gameplay');
                  setArenaGameSelect('domino');
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === 'gameplay' && arenaGameSelect === 'domino'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🀄</span>
                <span>Play Domino</span>
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter('gameplay');
                  setArenaGameSelect('jackaroo');
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTabFilter === 'gameplay' && arenaGameSelect === 'jackaroo'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏹</span>
                <span>Play Jackaroo</span>
              </button>
              <button
                onClick={() => {
                  setActiveTabFilter('commercial');
                  sounds.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTabFilter === 'commercial'
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Specifications
              </button>
            </div>
          </div>

          {/* Gameplay Canvas Container */}
          {activeTabFilter === 'gameplay' && (
            <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800 p-4 shadow-2xl overflow-hidden min-h-[480px]">
              {arenaGameSelect === 'ludo' && (
                <div className="max-w-md mx-auto h-[480px]">
                  <PlayableLudo onDownloadPrompt={() => setIsDownloadModalOpen(true)} />
                </div>
              )}
              {arenaGameSelect === 'domino' && (
                <div className="max-w-md mx-auto h-[460px]">
                  <PlayableDomino onDownloadPrompt={() => setIsDownloadModalOpen(true)} />
                </div>
              )}
              {arenaGameSelect === 'jackaroo' && (
                <div className="max-w-md mx-auto h-[460px]">
                  <PlayableJackaroo onDownloadPrompt={() => setIsDownloadModalOpen(true)} />
                </div>
              )}
            </div>
          )}

          {activeTabFilter === 'commercial' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-sm mb-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Format: 9:16 Vertical HD</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tailored for TikTok, Instagram Reels, YouTube Shorts, and WhatsApp Stories with cinematic lighting and realistic smartphone framing.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <span>1080 × 1920 Full HD</span>
                  <span>·</span>
                  <span>60 FPS Motion</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-display font-bold text-sm mb-2">
                  <Mic className="w-4 h-4" />
                  <span>Real-Time Voice & SFX</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Web Audio API synthesizer creates instant sound effects for dice rolling, coin clatter, treasure chest fanfare, and voice bubbles.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Zero Network Latency</span>
                  <span>·</span>
                  <span>Lossless Audio</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-yellow-400 font-display font-bold text-sm mb-2">
                  <Crown className="w-4 h-4" />
                  <span>VIP Memberships</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Featuring Knight ($11.99/mo) and Baron ($39.99/mo) royal passes, custom room creation, and gold coin multipliers.
                </p>
                <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Knight Pass</span>
                  <span>·</span>
                  <span>Baron Pass</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-950 border-t border-slate-800 px-4 sm:px-8 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-display font-bold text-slate-400">
            <span>🎲</span>
            <span>YALLA LUDO — Official Promotional Advertisement</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Play</span>
            <span aria-hidden="true">·</span>
            <span>Chat</span>
            <span aria-hidden="true">·</span>
            <span>Connect</span>
            <span aria-hidden="true">·</span>
            <span>Enjoy</span>
          </div>

          <p className="text-[11px] text-slate-500">
            Prices may vary by country and are subject to change.
          </p>
        </div>
      </footer>

      {/* Simulated Store Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
