import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, Sparkles, Wand2, Shield, Zap, RotateCcw, Volume2, Trophy, Flame } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface PlayerState {
  id: 'p1' | 'p2' | 'p3' | 'p4';
  name: string;
  color: 'yellow' | 'red' | 'blue' | 'green';
  colorClass: string;
  badgeBg: string;
  flag: string;
  isHuman: boolean;
  pawns: number[]; // -1 = base, 0-51 = track, 52-56 = home run, 57 = finished
  startIndex: number;
  speech: string;
}

const INITIAL_PLAYERS: PlayerState[] = [
  {
    id: 'p1',
    name: 'You (VIP)',
    color: 'yellow',
    colorClass: 'bg-amber-400 text-slate-950 border-amber-300',
    badgeBg: 'from-amber-400 to-yellow-500',
    flag: '👑',
    isHuman: true,
    pawns: [0, -1], // Start with one pawn already on track for instant gameplay action!
    startIndex: 0,
    speech: 'Tap roll to move! 🎲',
  },
  {
    id: 'p2',
    name: 'Layla',
    color: 'red',
    colorClass: 'bg-rose-500 text-white border-rose-400',
    badgeBg: 'from-rose-500 to-red-600',
    flag: '🇸🇦',
    isHuman: false,
    pawns: [13, -1], // One pawn on track
    startIndex: 13,
    speech: 'Yalla let’s play!',
  },
  {
    id: 'p3',
    name: 'Tariq',
    color: 'blue',
    colorClass: 'bg-blue-500 text-white border-blue-400',
    badgeBg: 'from-blue-500 to-indigo-600',
    flag: '🇦🇪',
    isHuman: false,
    pawns: [26, -1],
    startIndex: 26,
    speech: 'Watch my dice roll!',
  },
  {
    id: 'p4',
    name: 'Omar',
    color: 'green',
    colorClass: 'bg-emerald-500 text-white border-emerald-400',
    badgeBg: 'from-emerald-500 to-teal-600',
    flag: '🇪🇬',
    isHuman: false,
    pawns: [39, -1],
    startIndex: 39,
    speech: 'Good luck everyone!',
  },
];

const SAFE_INDICES = [0, 8, 13, 21, 26, 34, 39, 47];

export const PlayableLudo: React.FC<{ onDownloadPrompt?: () => void }> = ({ onDownloadPrompt }) => {
  const [players, setPlayers] = useState<PlayerState[]>(INITIAL_PLAYERS);
  const [currentTurn, setCurrentTurn] = useState<number>(0); // 0 = p1, 1 = p2, 2 = p3, 3 = p4
  const [diceValue, setDiceValue] = useState<number>(6);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [winner, setWinner] = useState<PlayerState | null>(null);
  const [twoPlayerMode, setTwoPlayerMode] = useState<boolean>(false);
  const [captureNotice, setCaptureNotice] = useState<string | null>(null);
  const [magicBoostUsed, setMagicBoostUsed] = useState<boolean>(false);

  const activePlayer = players[currentTurn];
  const activePlayerCount = twoPlayerMode ? 2 : 4;

  // Bot Turn Automation
  useEffect(() => {
    if (winner) return;
    if (!activePlayer.isHuman) {
      const botTimer = setTimeout(() => {
        handleBotTurn();
      }, 900);
      return () => clearTimeout(botTimer);
    }
  }, [currentTurn, winner]);

  const handleBotTurn = () => {
    if (isRolling || winner) return;
    setIsRolling(true);
    sounds.playDiceRoll();

    // Bot speech
    const botPhrases = [
      'Rolling... 🎲',
      'Hope I get a 6!',
      'Watch this move!',
      'Yalla Ludo time!',
      'Target acquired! 🎯',
    ];
    updatePlayerSpeech(activePlayer.id, botPhrases[Math.floor(Math.random() * botPhrases.length)]);

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setIsRolling(false);

      // Bot move logic
      executeBotMove(rolled);
    }, 600);
  };

  const updatePlayerSpeech = (playerId: string, speech: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, speech } : p))
    );
  };

  const executeBotMove = (rolled: number) => {
    setPlayers((prev) => {
      const currentP = prev[currentTurn];
      const newPawns = [...currentP.pawns];

      let moved = false;
      // 1. Try to exit base on 6
      if (rolled === 6 && newPawns[1] === -1) {
        newPawns[1] = currentP.startIndex;
        moved = true;
        sounds.playPawnMove();
        updatePlayerSpeech(currentP.id, 'Pawn unleashed! 🚀');
      } else if (newPawns[0] >= 0 && newPawns[0] < 57) {
        // Move pawn 0
        newPawns[0] = Math.min(57, newPawns[0] + rolled);
        moved = true;
        sounds.playPawnMove();
      } else if (newPawns[1] >= 0 && newPawns[1] < 57) {
        newPawns[1] = Math.min(57, newPawns[1] + rolled);
        moved = true;
        sounds.playPawnMove();
      }

      // Check if bot captured player 1
      if (moved) {
        checkCaptures(currentP.id, newPawns);
      }

      const updated = prev.map((p, idx) =>
        idx === currentTurn ? { ...p, pawns: newPawns } : p
      );

      // Check win
      if (newPawns.every((pos) => pos >= 55)) {
        setWinner(currentP);
        sounds.playVipFanfare();
      } else {
        // Next turn (bonus turn if rolled 6)
        if (rolled !== 6) {
          nextTurn();
        }
      }

      return updated;
    });
  };

  const nextTurn = () => {
    setCurrentTurn((prev) => (prev + 1) % activePlayerCount);
    setHasRolled(false);
  };

  // Human Player Rolls Dice
  const handleHumanRoll = () => {
    if (isRolling || hasRolled || !activePlayer.isHuman || winner) return;

    setIsRolling(true);
    sounds.playDiceRoll();

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setIsRolling(false);
      setHasRolled(true);

      // Auto-move if only 1 valid option or none
      const p = players[0];
      const canExit = rolled === 6 && (p.pawns[0] === -1 || p.pawns[1] === -1);
      const activePawns = p.pawns.filter((pos) => pos >= 0 && pos < 57);

      if (!canExit && activePawns.length === 0) {
        // Cannot move at all!
        updatePlayerSpeech('p1', 'No moves! Next turn.');
        setTimeout(nextTurn, 800);
      } else if (!canExit && activePawns.length === 1) {
        // Only one pawn on track, auto-move it for smooth snappy play!
        const pawnIndex = p.pawns.findIndex((pos) => pos >= 0 && pos < 57);
        setTimeout(() => handleMovePawn(pawnIndex, rolled), 300);
      } else {
        updatePlayerSpeech('p1', `Select a pawn to move ${rolled} steps!`);
      }
    }, 600);
  };

  // Human Moves a Pawn
  const handleMovePawn = (pawnIndex: number, stepsToMove: number = diceValue) => {
    if (!hasRolled && activePlayer.isHuman) return;

    setPlayers((prev) => {
      const p1 = prev[0];
      const newPawns = [...p1.pawns];
      const currentPos = newPawns[pawnIndex];

      if (currentPos === -1) {
        // Exiting base requires a 6
        if (stepsToMove === 6) {
          newPawns[pawnIndex] = p1.startIndex;
          sounds.playPawnMove();
          updatePlayerSpeech('p1', 'Out on the track! ⭐');
        } else {
          return prev;
        }
      } else if (currentPos >= 0 && currentPos < 57) {
        const nextPos = Math.min(57, currentPos + stepsToMove);
        newPawns[pawnIndex] = nextPos;
        sounds.playPawnMove();

        // Check if won
        if (nextPos === 57) {
          sounds.playChestOpen();
          updatePlayerSpeech('p1', 'Pawn into Goal! 🏆');
        }
      }

      // Check if captured any opponents
      checkCaptures('p1', newPawns);

      const updated = prev.map((p, idx) =>
        idx === 0 ? { ...p, pawns: newPawns } : p
      );

      // Check win condition
      if (newPawns.every((pos) => pos >= 55)) {
        setWinner(p1);
        sounds.playVipFanfare();
      } else {
        if (stepsToMove !== 6) {
          nextTurn();
        } else {
          setHasRolled(false);
          updatePlayerSpeech('p1', 'Rolled a 6! Extra roll! 🎲');
        }
      }

      return updated;
    });
  };

  const checkCaptures = (attackerId: string, attackerPawns: number[]) => {
    setPlayers((prev) => {
      let captureOccurred = false;
      let capturedVictim = '';

      const updated = prev.map((p) => {
        if (p.id === attackerId) return p;

        const newPawns = p.pawns.map((pos) => {
          if (pos >= 0 && pos < 52 && !SAFE_INDICES.includes(pos)) {
            if (attackerPawns.includes(pos)) {
              captureOccurred = true;
              capturedVictim = p.name;
              sounds.playCapture();
              return -1; // Send back to base!
            }
          }
          return pos;
        });

        return { ...p, pawns: newPawns };
      });

      if (captureOccurred) {
        setCaptureNotice(`💥 KNOCKOUT! ${capturedVictim} was sent back to base!`);
        setTimeout(() => setCaptureNotice(null), 2500);
      }

      return updated;
    });
  };

  // Magic Tools Handlers (Yalla Ludo Feature)
  const handleMagicReroll = () => {
    if (magicBoostUsed || !hasRolled || !activePlayer.isHuman) return;
    setMagicBoostUsed(true);
    sounds.playChestOpen();
    setIsRolling(true);
    setTimeout(() => {
      const nextRoll = 6; // Magic reroll guarantees a 6!
      setDiceValue(nextRoll);
      setIsRolling(false);
      updatePlayerSpeech('p1', '⚡ MAGIC 6 TRIGGERED!');
    }, 400);
  };

  const handleResetGame = () => {
    sounds.playClick();
    setPlayers(INITIAL_PLAYERS);
    setCurrentTurn(0);
    setHasRolled(false);
    setWinner(null);
    setCaptureNotice(null);
    setMagicBoostUsed(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden bg-slate-950">
      {/* Top Header & Mode Toggle */}
      <div className="relative z-10 flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🎲</span>
          <div>
            <span className="font-display font-black text-xs sm:text-sm text-amber-300 block leading-tight">
              PLAYABLE LUDO MATCH
            </span>
            <span className="text-[10px] text-slate-400">Live Interactive Board</span>
          </div>
        </div>

        {/* Players count toggle */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
          <button
            onClick={() => {
              sounds.playClick();
              setTwoPlayerMode(true);
            }}
            className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
              twoPlayerMode ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'
            }`}
          >
            2P Duel
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setTwoPlayerMode(false);
            }}
            className={`px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
              !twoPlayerMode ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400'
            }`}
          >
            4P Match
          </button>
        </div>
      </div>

      {/* Capture Announcement Banner */}
      <AnimatePresence>
        {captureNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 left-4 right-4 z-40 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs py-1.5 px-3 rounded-xl text-center shadow-lg border border-yellow-300 flex items-center justify-center gap-1"
          >
            <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-bounce" />
            <span>{captureNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player Voice Badges (Top: Layla & Omar, Bottom: You & Tariq) */}
      <div className="relative z-10 grid grid-cols-2 gap-2 my-1">
        {players.slice(0, activePlayerCount).map((p, idx) => {
          const isTurn = idx === currentTurn;
          return (
            <div
              key={p.id}
              className={`p-1.5 rounded-xl border transition-all flex items-center gap-2 ${
                isTurn
                  ? 'bg-slate-900 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                  : 'bg-slate-900/60 border-slate-800 opacity-80'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.badgeBg} flex items-center justify-center text-xs font-bold text-white shadow`}
              >
                {p.flag}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white truncate">{p.name}</span>
                  {isTurn && (
                    <span className="text-[9px] px-1 rounded bg-amber-400 text-slate-950 font-black animate-pulse">
                      TURN
                    </span>
                  )}
                </div>
                <span className="text-[9px] text-amber-200/80 truncate block">{p.speech}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Board */}
      <div className="relative z-10 my-auto flex flex-col items-center">
        {/* Ludo Board Representation */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-slate-900 rounded-3xl p-2.5 border-2 border-slate-700 shadow-2xl grid grid-cols-3 grid-rows-3 gap-1.5">
          {/* Top Left: Red Base (Layla) */}
          <div className="bg-rose-950/80 rounded-2xl p-2 border border-rose-600/40 flex flex-col justify-between">
            <span className="text-[9px] font-bold text-rose-300">🇸🇦 Layla Base</span>
            <div className="flex items-center justify-around">
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[1].pawns[0] === -1 ? 'bg-rose-500 border-white shadow' : 'bg-rose-950/40 border-dashed border-rose-600'
                }`}
              />
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[1].pawns[1] === -1 ? 'bg-rose-500 border-white shadow' : 'bg-rose-950/40 border-dashed border-rose-600'
                }`}
              />
            </div>
          </div>

          {/* Top Center: Track Arm 1 */}
          <div className="bg-slate-950/90 rounded-xl p-1 flex flex-col items-center justify-around border border-slate-800">
            <span className="text-[10px] text-slate-500">⭐ Safe</span>
            <div className="w-full flex justify-around">
              {players.map((p) =>
                p.pawns.map((pos, pIdx) =>
                  pos >= 10 && pos <= 15 ? (
                    <span
                      key={`${p.id}-${pIdx}`}
                      className={`w-3.5 h-3.5 rounded-full border border-white text-[8px] flex items-center justify-center font-bold ${
                        p.id === 'p1' ? 'bg-amber-400 text-slate-950' : 'bg-rose-500 text-white'
                      }`}
                    >
                      •
                    </span>
                  ) : null
                )
              )}
            </div>
          </div>

          {/* Top Right: Green Base (Omar) */}
          <div className="bg-emerald-950/80 rounded-2xl p-2 border border-emerald-600/40 flex flex-col justify-between">
            <span className="text-[9px] font-bold text-emerald-300">🇪🇬 Omar Base</span>
            <div className="flex items-center justify-around">
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[3]?.pawns[0] === -1 ? 'bg-emerald-500 border-white shadow' : 'bg-emerald-950/40 border-dashed border-emerald-600'
                }`}
              />
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[3]?.pawns[1] === -1 ? 'bg-emerald-500 border-white shadow' : 'bg-emerald-950/40 border-dashed border-emerald-600'
                }`}
              />
            </div>
          </div>

          {/* Middle Left: Track Arm 2 */}
          <div className="bg-slate-950/90 rounded-xl p-1 flex items-center justify-around border border-slate-800">
            <span className="text-[9px] text-rose-400 font-bold">START</span>
          </div>

          {/* Center Triangle Goal */}
          <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl border-2 border-white flex flex-col items-center justify-center shadow-lg p-1 text-center">
            <span className="text-xl">🏆</span>
            <span className="text-[8px] font-black text-slate-950 uppercase tracking-tighter">
              GOAL
            </span>
          </div>

          {/* Middle Right: Track Arm 3 */}
          <div className="bg-slate-950/90 rounded-xl p-1 flex items-center justify-around border border-slate-800">
            <span className="text-[9px] text-blue-400 font-bold">START</span>
          </div>

          {/* Bottom Left: Yellow Base (You 👑) */}
          <div className="bg-amber-950/80 rounded-2xl p-2 border-2 border-amber-400/70 flex flex-col justify-between shadow-inner">
            <span className="text-[9px] font-black text-amber-300">👑 You (Base)</span>
            <div className="flex items-center justify-around">
              <button
                onClick={() => handleMovePawn(0)}
                disabled={currentTurn !== 0 || !hasRolled}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                  players[0].pawns[0] === -1
                    ? diceValue === 6 && hasRolled
                      ? 'bg-amber-400 border-white animate-bounce ring-2 ring-yellow-300'
                      : 'bg-amber-400 border-white'
                    : 'bg-amber-950/40 border-dashed border-amber-600'
                }`}
                title="Tap to move Pawn 1"
              />
              <button
                onClick={() => handleMovePawn(1)}
                disabled={currentTurn !== 0 || !hasRolled}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                  players[0].pawns[1] === -1
                    ? diceValue === 6 && hasRolled
                      ? 'bg-amber-400 border-white animate-bounce ring-2 ring-yellow-300'
                      : 'bg-amber-400 border-white'
                    : 'bg-amber-950/40 border-dashed border-amber-600'
                }`}
                title="Tap to move Pawn 2"
              />
            </div>
          </div>

          {/* Bottom Center: Track Arm 4 (Your Start Arm) */}
          <div className="bg-slate-950/90 rounded-xl p-1 flex flex-col items-center justify-around border border-slate-800">
            <span className="text-[9px] text-amber-400 font-bold">YOUR START</span>
            {/* Interactive Pawn Tokens currently active on board */}
            <div className="flex items-center gap-1">
              {players[0].pawns.map((pos, pIdx) =>
                pos >= 0 ? (
                  <button
                    key={pIdx}
                    onClick={() => handleMovePawn(pIdx)}
                    disabled={currentTurn !== 0 || !hasRolled}
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-black border transition-all cursor-pointer ${
                      currentTurn === 0 && hasRolled
                        ? 'bg-amber-400 text-slate-950 border-white ring-2 ring-amber-300 animate-pulse scale-110'
                        : 'bg-amber-500/80 text-slate-950 border-amber-300'
                    }`}
                  >
                    P{pIdx + 1}: {pos}
                  </button>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom Right: Blue Base (Tariq) */}
          <div className="bg-blue-950/80 rounded-2xl p-2 border border-blue-600/40 flex flex-col justify-between">
            <span className="text-[9px] font-bold text-blue-300">🇦🇪 Tariq Base</span>
            <div className="flex items-center justify-around">
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[2]?.pawns[0] === -1 ? 'bg-blue-500 border-white shadow' : 'bg-blue-950/40 border-dashed border-blue-600'
                }`}
              />
              <span
                className={`w-4 h-4 rounded-full border-2 ${
                  players[2]?.pawns[1] === -1 ? 'bg-blue-500 border-white shadow' : 'bg-blue-950/40 border-dashed border-blue-600'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Victory Modal */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md rounded-3xl p-4 flex flex-col items-center justify-center text-center"
            >
              <Trophy className="w-16 h-16 text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-bounce" />
              <h3 className="text-2xl font-display font-black text-amber-300 mt-2">
                {winner.isHuman ? '🎉 YOU WON THE MATCH!' : `${winner.name} Won!`}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {winner.isHuman
                  ? 'Congratulations! Reward: +50,000 GOLD COINS 🪙'
                  : 'Great game! Challenge millions of players on Yalla Ludo!'}
              </p>

              <div className="flex items-center gap-2 mt-4 w-full">
                <button
                  onClick={handleResetGame}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Play Again ↺
                </button>
                <button
                  onClick={() => onDownloadPrompt?.()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs hover:from-amber-300 shadow-md cursor-pointer"
                >
                  Download App 🚀
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Turn Action & Dice Controller Bar */}
      <div className="relative z-10 flex flex-col gap-2 pt-1 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          {/* Active status */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">
              {currentTurn === 0 ? 'Your Turn:' : `${activePlayer.name}'s Turn:`}
            </span>
            <span className="text-[11px] text-amber-300 font-semibold">
              {currentTurn === 0
                ? hasRolled
                  ? 'Tap pawn to move!'
                  : 'Tap ROLL DICE!'
                : 'Bot thinking...'}
            </span>
          </div>

          {/* Magic Tools (Yalla Ludo signature feature) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleMagicReroll}
              disabled={magicBoostUsed || !hasRolled || currentTurn !== 0}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                !magicBoostUsed && hasRolled && currentTurn === 0
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md animate-pulse'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
              title="Magic 6 Reroll Booster"
            >
              <Zap className="w-3 h-3 text-yellow-300" />
              <span>Magic 6</span>
            </button>

            <button
              onClick={handleResetGame}
              className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Restart Match"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Big Interactive 3D Dice Button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: currentTurn === 0 && !hasRolled ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHumanRoll}
            disabled={currentTurn !== 0 || hasRolled || isRolling}
            className={`w-14 h-14 rounded-2xl p-1.5 shadow-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
              currentTurn === 0 && !hasRolled
                ? 'bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 border-white shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                : 'bg-slate-800 border-slate-700 opacity-90'
            } ${isRolling ? 'animate-dice-spin' : ''}`}
          >
            {/* Render Dice Dots */}
            <div className="w-full h-full rounded-xl bg-slate-950/20 flex flex-col justify-between p-1">
              <div className="flex justify-between">
                {[2, 3, 4, 5, 6].includes(diceValue) && <span className="w-2 h-2 rounded-full bg-white" />}
                {diceValue === 6 && <span className="w-2 h-2 rounded-full bg-white" />}
                {[4, 5, 6].includes(diceValue) && <span className="w-2 h-2 rounded-full bg-white ml-auto" />}
              </div>
              <div className="flex justify-center">
                {[1, 3, 5].includes(diceValue) && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300 ring-1 ring-white" />
                )}
              </div>
              <div className="flex justify-between">
                {[4, 5, 6].includes(diceValue) && <span className="w-2 h-2 rounded-full bg-white" />}
                {diceValue === 6 && <span className="w-2 h-2 rounded-full bg-white" />}
                {[2, 3, 4, 5, 6].includes(diceValue) && <span className="w-2 h-2 rounded-full bg-white ml-auto" />}
              </div>
            </div>
          </motion.button>

          {/* Roll CTA Action Button */}
          <button
            onClick={handleHumanRoll}
            disabled={currentTurn !== 0 || hasRolled || isRolling}
            className={`flex-1 py-3 px-4 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
              currentTurn === 0 && !hasRolled
                ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 text-slate-950 shadow-amber-500/30 shimmer-effect'
                : hasRolled && currentTurn === 0
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
          >
            <Dices className="w-4 h-4" />
            <span>
              {currentTurn === 0
                ? hasRolled
                  ? `ROLLED ${diceValue}! TAP PAWN`
                  : 'TAP TO ROLL DICE'
                : `${activePlayer.name.toUpperCase()} IS ROLLING...`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
