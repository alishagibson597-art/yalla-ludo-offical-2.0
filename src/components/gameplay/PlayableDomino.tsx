import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, Plus, CheckCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface DominoTile {
  id: string;
  left: number;
  right: number;
}

export const PlayableDomino: React.FC<{ onDownloadPrompt?: () => void }> = ({ onDownloadPrompt }) => {
  const [boardTiles, setBoardTiles] = useState<DominoTile[]>([
    { id: 'start-1', left: 6, right: 3 },
  ]);
  const [playerHand, setPlayerHand] = useState<DominoTile[]>([
    { id: 'p-1', left: 6, right: 5 },
    { id: 'p-2', left: 3, right: 4 },
    { id: 'p-3', left: 5, right: 2 },
    { id: 'p-4', left: 4, right: 4 },
    { id: 'p-5', left: 2, right: 1 },
  ]);
  const [botTileCount, setBotTileCount] = useState<number>(5);
  const [playerScore, setPlayerScore] = useState<number>(15);
  const [botScore, setBotScore] = useState<number>(10);
  const [isBotTurn, setIsBotTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Leftmost number and Rightmost number of the board chain
  const openLeft = boardTiles[0]?.left ?? 0;
  const openRight = boardTiles[boardTiles.length - 1]?.right ?? 0;

  const isTilePlayable = (tile: DominoTile) => {
    return (
      tile.left === openLeft ||
      tile.right === openLeft ||
      tile.left === openRight ||
      tile.right === openRight
    );
  };

  const handlePlayTile = (tile: DominoTile) => {
    if (isBotTurn || winner) return;
    if (!isTilePlayable(tile)) {
      sounds.playClick();
      return;
    }

    sounds.playDominoClick();
    const newHand = playerHand.filter((t) => t.id !== tile.id);
    setPlayerHand(newHand);

    // Orient and attach to board
    let newBoard = [...boardTiles];
    if (tile.left === openRight) {
      newBoard.push({ ...tile, left: tile.left, right: tile.right });
    } else if (tile.right === openRight) {
      newBoard.push({ ...tile, left: tile.right, right: tile.left });
    } else if (tile.right === openLeft) {
      newBoard.unshift({ ...tile, left: tile.left, right: tile.right });
    } else if (tile.left === openLeft) {
      newBoard.unshift({ ...tile, left: tile.right, right: tile.left });
    } else {
      newBoard.push(tile);
    }
    setBoardTiles(newBoard);

    // Score points if ends sum to multiple of 5 (All Five mode)
    const newLeft = newBoard[0].left;
    const newRight = newBoard[newBoard.length - 1].right;
    if ((newLeft + newRight) % 5 === 0) {
      setPlayerScore((prev) => prev + (newLeft + newRight));
      sounds.playCoinChime();
    }

    if (newHand.length === 0) {
      setWinner('You');
      sounds.playVipFanfare();
      return;
    }

    // Bot's Turn
    setIsBotTurn(true);
    setTimeout(() => {
      handleBotMove(newBoard);
    }, 1000);
  };

  const handleBotMove = (currentBoard: DominoTile[]) => {
    const curLeft = currentBoard[0].left;
    const curRight = currentBoard[currentBoard.length - 1].right;

    // Simulate bot playing a matching tile
    sounds.playDominoClick();
    const botPlayed: DominoTile = {
      id: `bot-${Date.now()}`,
      left: curRight,
      right: Math.floor(Math.random() * 6) + 1,
    };
    const nextBoard = [...currentBoard, botPlayed];
    setBoardTiles(nextBoard);
    setBotTileCount((prev) => {
      const nextCount = prev - 1;
      if (nextCount <= 0) {
        setWinner('Karim');
        sounds.playChestOpen();
      }
      return nextCount;
    });

    setIsBotTurn(false);
  };

  const handleDrawTile = () => {
    sounds.playClick();
    const newTile: DominoTile = {
      id: `draw-${Date.now()}`,
      left: Math.floor(Math.random() * 6) + 1,
      right: Math.floor(Math.random() * 6) + 1,
    };
    setPlayerHand((prev) => [...prev, newTile]);
  };

  const handleReset = () => {
    sounds.playClick();
    setBoardTiles([{ id: 'start-1', left: 6, right: 3 }]);
    setPlayerHand([
      { id: 'p-1', left: 6, right: 5 },
      { id: 'p-2', left: 3, right: 4 },
      { id: 'p-3', left: 5, right: 2 },
      { id: 'p-4', left: 4, right: 4 },
      { id: 'p-5', left: 2, right: 1 },
    ]);
    setBotTileCount(5);
    setPlayerScore(15);
    setBotScore(10);
    setIsBotTurn(false);
    setWinner(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 select-none overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="text-base">🀄</span>
          <div>
            <span className="font-display font-black text-xs sm:text-sm text-amber-300 block leading-tight">
              PLAYABLE DOMINO DUEL
            </span>
            <span className="text-[10px] text-slate-400">All Five & Draw Game Rules</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800 text-[10px] font-bold">
            <span className="text-amber-400">Score: {playerScore}</span>
            <span className="text-slate-500">vs</span>
            <span className="text-rose-400">{botScore}</span>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            title="Restart Match"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Opponent Bot Info */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-800 my-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow">
            🇪🇬
          </div>
          <div>
            <span className="text-[11px] font-bold text-white block leading-tight">Karim (Egypt)</span>
            <span className="text-[9px] text-slate-400">Remaining Tiles: {botTileCount}</span>
          </div>
        </div>

        {isBotTurn ? (
          <span className="text-[10px] text-amber-400 font-bold animate-pulse">Thinking... 🀄</span>
        ) : (
          <span className="text-[10px] text-emerald-400 font-bold">Waiting for you</span>
        )}
      </div>

      {/* Center Domino Table Chain */}
      <div className="relative my-auto flex flex-col items-center justify-center min-h-[160px] bg-gradient-to-b from-emerald-950/60 via-slate-900 to-emerald-950/60 rounded-2xl p-3 border-2 border-amber-500/30 shadow-inner overflow-x-auto w-full">
        <div className="text-[9px] font-bold text-amber-300/80 mb-2 uppercase tracking-wide">
          Open Ends: <span className="text-white font-black">[{openLeft}]</span> and <span className="text-white font-black">[{openRight}]</span>
        </div>

        {/* Board Chain of Tiles */}
        <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto max-w-full p-1 scrollbar-none">
          {boardTiles.map((tile, i) => (
            <motion.div
              key={tile.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-16 sm:w-9 sm:h-18 rounded-lg bg-stone-100 border border-stone-300 shadow-md p-1 flex flex-col justify-between shrink-0"
            >
              <div className="flex-1 flex items-center justify-center text-xs font-black text-slate-900">
                {tile.left}
              </div>
              <div className="h-[1px] bg-stone-400 w-full" />
              <div className="flex-1 flex items-center justify-center text-xs font-black text-red-600">
                {tile.right}
              </div>
            </motion.div>
          ))}
        </div>

        {winner && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center text-center"
          >
            <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
            <h4 className="text-lg font-black text-amber-300 mt-1">
              {winner === 'You' ? '🎉 YOU WON THE DUEL!' : 'Karim Won!'}
            </h4>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs"
              >
                Play Again
              </button>
              <button
                onClick={() => onDownloadPrompt?.()}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs"
              >
                Download Full App
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Player Hand Tray */}
      <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-white">Your Hand ({playerHand.length} tiles):</span>
          <button
            onClick={handleDrawTile}
            className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Draw Tile</span>
          </button>
        </div>

        {/* Hand Tiles Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
          {playerHand.map((tile) => {
            const playable = isTilePlayable(tile);
            return (
              <motion.button
                key={tile.id}
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlayTile(tile)}
                className={`w-9 h-18 sm:w-10 sm:h-20 rounded-xl border-2 p-1 flex flex-col justify-between transition-all cursor-pointer shadow-md shrink-0 ${
                  playable
                    ? 'bg-amber-100 border-amber-400 ring-2 ring-yellow-400/60 shadow-amber-500/30'
                    : 'bg-stone-200 border-stone-300 opacity-60'
                }`}
              >
                <div className="flex-1 flex items-center justify-center text-sm font-black text-slate-900">
                  {tile.left}
                </div>
                <div className="h-[1px] bg-stone-400 w-full" />
                <div className="flex-1 flex items-center justify-center text-sm font-black text-red-600">
                  {tile.right}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
