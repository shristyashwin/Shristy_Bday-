import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Wand2, RefreshCw, Trophy, Heart, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import RomanticButton from '../components/RomanticButton';
import confetti from 'canvas-confetti';

const GRID_SIZE = 4;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE; // 16

export default function LovePuzzle({ onNext }) {
  // Solved state is [0, 1, ..., 15] where 15 is the empty space
  const [tiles, setTiles] = useState(() => Array.from({ length: TOTAL_TILES }, (_, i) => i));
  const [emptyIndex, setEmptyIndex] = useState(TOTAL_TILES - 1);
  const [movesCount, setMovesCount] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isAutoSolving, setIsAutoSolving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const autoSolveIntervalRef = useRef(null);

  // Helper: check if two positions are adjacent in 4x4
  const isAdjacent = (pos1, pos2) => {
    const row1 = Math.floor(pos1 / GRID_SIZE);
    const col1 = pos1 % GRID_SIZE;
    const row2 = Math.floor(pos2 / GRID_SIZE);
    const col2 = pos2 % GRID_SIZE;
    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
  };

  // Helper: get adjacent indices for an empty spot
  const getAdjacentIndices = (pos) => {
    const row = Math.floor(pos / GRID_SIZE);
    const col = pos % GRID_SIZE;
    const neighbors = [];
    if (row > 0) neighbors.push(pos - GRID_SIZE);
    if (row < GRID_SIZE - 1) neighbors.push(pos + GRID_SIZE);
    if (col > 0) neighbors.push(pos - 1);
    if (col < GRID_SIZE - 1) neighbors.push(pos + 1);
    return neighbors;
  };

  // Shuffle puzzle using valid moves from solved state to guarantee solvability
  // Stable reference (empty deps) so useEffect cleanup NEVER fires on state changes!
  const shufflePuzzle = useCallback(() => {
    if (autoSolveIntervalRef.current) {
      clearInterval(autoSolveIntervalRef.current);
      autoSolveIntervalRef.current = null;
    }
    setIsAutoSolving(false);

    let currentTiles = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    let currentEmpty = TOTAL_TILES - 1;

    // Make 45 valid random moves
    const shuffleSteps = 45;
    let prevPos = -1;

    for (let i = 0; i < shuffleSteps; i++) {
      const neighbors = getAdjacentIndices(currentEmpty).filter(n => n !== prevPos);
      const chosenNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

      // Swap empty and neighbor
      currentTiles[currentEmpty] = currentTiles[chosenNeighbor];
      currentTiles[chosenNeighbor] = TOTAL_TILES - 1;
      
      prevPos = currentEmpty;
      currentEmpty = chosenNeighbor;
    }

    setTiles(currentTiles);
    setEmptyIndex(currentEmpty);
    setMovesCount(0);
    setIsSolved(false);
  }, []);

  // Initial shuffle on mount ONLY
  useEffect(() => {
    shufflePuzzle();
    return () => {
      if (autoSolveIntervalRef.current) {
        clearInterval(autoSolveIntervalRef.current);
      }
    };
  }, [shufflePuzzle]);

  // Move a tile on click
  const handleTileClick = (index) => {
    if (isSolved || isAutoSolving) return;
    if (!isAdjacent(index, emptyIndex)) return;

    const newTiles = [...tiles];
    newTiles[emptyIndex] = newTiles[index];
    newTiles[index] = TOTAL_TILES - 1;

    setTiles(newTiles);
    setEmptyIndex(index);
    setMovesCount(prev => prev + 1);

    // Check if solved
    const solved = newTiles.every((val, i) => val === i);
    if (solved) {
      handlePuzzleSolved();
    }
  };

  const handlePuzzleSolved = () => {
    setIsSolved(true);
    setIsAutoSolving(false);
    if (autoSolveIntervalRef.current) {
      clearInterval(autoSolveIntervalRef.current);
      autoSolveIntervalRef.current = null;
    }

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
    });
  };

  // Special Auto-Solver Button: Actually slides pieces into place step-by-step!
  const handleAutoSolve = () => {
    if (isSolved || isAutoSolving) return;
    setIsAutoSolving(true);

    if (autoSolveIntervalRef.current) {
      clearInterval(autoSolveIntervalRef.current);
    }

    let current = [...tiles];
    let targetSlot = 0;

    autoSolveIntervalRef.current = setInterval(() => {
      // Find the next target slot that doesn't have the correct tile
      while (targetSlot < TOTAL_TILES - 1 && current[targetSlot] === targetSlot) {
        targetSlot++;
      }

      if (targetSlot < TOTAL_TILES - 1) {
        const sourceIndex = current.indexOf(targetSlot);
        if (sourceIndex !== -1 && sourceIndex !== targetSlot) {
          // Swap pieces so tile moves to its home
          const temp = current[targetSlot];
          current[targetSlot] = current[sourceIndex];
          current[sourceIndex] = temp;

          const newEmpty = current.indexOf(TOTAL_TILES - 1);
          setEmptyIndex(newEmpty);

          setTiles([...current]);
          setMovesCount(prev => prev + 1);
          targetSlot++;
        } else {
          targetSlot++;
        }
      } else {
        // All pieces 0..14 are in place! Finalize solved state and empty slot at 15
        if (autoSolveIntervalRef.current) {
          clearInterval(autoSolveIntervalRef.current);
          autoSolveIntervalRef.current = null;
        }
        const finalSolved = Array.from({ length: TOTAL_TILES }, (_, i) => i);
        setTiles(finalSolved);
        setEmptyIndex(TOTAL_TILES - 1);
        setIsSolved(true);
        setIsAutoSolving(false);

        confetti({
          particleCount: 95,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
        });
      }
    }, 75); // 75ms per sliding tile
  };

  // Compute background offset for 4x4 image
  const getBackgroundPosition = (tileId) => {
    const row = Math.floor(tileId / GRID_SIZE);
    const col = tileId % GRID_SIZE;
    const xPercent = (col / (GRID_SIZE - 1)) * 100;
    const yPercent = (row / (GRID_SIZE - 1)) * 100;
    return `${xPercent}% ${yPercent}%`;
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 z-10 select-none">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-rose-200 text-rose-700 text-xs font-semibold mb-2 shadow-sm">
            <Puzzle className="w-3.5 h-3.5 text-rose-500" />
            <span>4×4 Sliding Love Puzzle</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
            The Love Puzzle 🧩
          </h1>
          <p className="text-xs md:text-sm text-rose-600 mt-1 max-w-sm mx-auto">
            {birthdayConfig.puzzle.instruction}
          </p>

          {/* Moves & Controls bar */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="px-3 py-1 rounded-xl bg-white/90 border border-rose-200 text-xs font-semibold text-rose-800 shadow-sm">
              Moves: <strong className="font-mono text-rose-600">{movesCount}</strong>
            </span>
            <button
              onClick={shufflePuzzle}
              disabled={isAutoSolving}
              className="px-3 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 border border-rose-200 text-xs font-medium text-rose-700 flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className="w-3 h-3" />
              Reset & Reshuffle
            </button>
          </div>
        </div>

        {/* 4x4 Puzzle Board */}
        <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square p-2 bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 rounded-3xl shadow-2xl border-4 border-white/90">
          <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 sm:gap-1.5 bg-rose-50/50 rounded-2xl overflow-hidden p-1">
            {tiles.map((tileId, index) => {
              const isEmpty = tileId === TOTAL_TILES - 1;
              const isTileAdjacent = isAdjacent(index, emptyIndex);

              // Blank slot while playing; reveals full completed tile once solved!
              if (isEmpty && !isSolved) {
                return (
                  <div
                    key="empty"
                    className="w-full h-full rounded-xl bg-rose-200/40 border-2 border-dashed border-rose-300/50 flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 text-rose-300/60" />
                  </div>
                );
              }

              return (
                <motion.button
                  key={tileId}
                  layout
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  onClick={() => handleTileClick(index)}
                  disabled={!isTileAdjacent || isSolved || isAutoSolving}
                  className={`relative w-full h-full rounded-xl overflow-hidden shadow-md flex items-center justify-center focus:outline-none transition-transform select-none ${
                    isTileAdjacent && !isSolved && !isAutoSolving
                      ? 'cursor-pointer ring-2 ring-rose-400 hover:scale-[1.03]'
                      : 'cursor-default'
                  }`}
                  style={{
                    backgroundImage: !imageError ? `url(${birthdayConfig.puzzle.imagePath})` : 'none',
                    backgroundSize: '400% 400%',
                    backgroundPosition: getBackgroundPosition(tileId),
                    backgroundColor: imageError ? '#fda4af' : 'transparent',
                  }}
                >
                  {/* Fallback styling if custom photo is not provided yet */}
                  {imageError && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-pink-400 via-rose-400 to-red-400 text-white font-bold p-1">
                      <span className="text-xs sm:text-sm font-mono drop-shadow">{tileId + 1}</span>
                      <Heart className="w-3 h-3 fill-white/80 opacity-70" />
                    </div>
                  )}

                  {/* Tile number badge */}
                  <span className="absolute bottom-1 right-1 text-[9px] px-1 rounded bg-black/40 text-white/90 font-mono pointer-events-none">
                    {tileId + 1}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Hidden image element to detect load error gracefully */}
          <img
            src={birthdayConfig.puzzle.imagePath}
            alt="puzzle detector"
            className="hidden"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Action Controls & Special Auto-Solver Button */}
        {!isSolved ? (
          <div className="mt-5 w-full flex flex-col items-center gap-2">
            <RomanticButton
              onClick={handleAutoSolve}
              disabled={isAutoSolving}
              variant="secondary"
              size="md"
              icon={Wand2}
              className="border-2 border-rose-300 shadow-md hover:border-rose-400 cursor-pointer"
            >
              {isAutoSolving ? "Auto-solving our puzzle... ✨" : birthdayConfig.puzzle.solveForMeButton}
            </RomanticButton>
            <p className="text-[11px] text-slate-500 italic text-center">
              (Tap a tile next to the empty slot to slide it, or let the magic button solve it for you!)
            </p>
          </div>
        ) : (
          /* Completion Message Card */
          <div className="mt-6 w-full glass-panel-romantic rounded-3xl p-6 text-center shadow-xl border border-rose-200 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-400/40 mb-3 animate-bounce">
              <Trophy className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-800 mb-2">
              {birthdayConfig.puzzle.completionHeading}
            </h3>
            
            <p className="text-rose-700 text-sm whitespace-pre-line leading-relaxed font-medium mb-6">
              {birthdayConfig.puzzle.completionMessage}
            </p>

            <RomanticButton
              onClick={onNext}
              size="md"
              className="shadow-lg"
            >
              {birthdayConfig.puzzle.buttonText}
            </RomanticButton>
          </div>
        )}
      </div>
    </div>
  );
}
