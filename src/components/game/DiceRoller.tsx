'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DiceResult } from '@/lib/gameLogic';

interface DiceRollerProps {
  onRoll?: (results: DiceResult[]) => void;
  isRolling: boolean;
  diceCount: number;
  results?: DiceResult[];
  disabled?: boolean;
}

export function DiceRoller({ isRolling, diceCount, results, disabled }: DiceRollerProps) {
  const [rollingDice, setRollingDice] = useState<number[]>([]);

  useEffect(() => {
    if (isRolling) {
      // Generate random values during animation
      const interval = setInterval(() => {
        setRollingDice(Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isRolling, diceCount]);

  const displayResults = isRolling ? rollingDice : (results?.map(r => r.value) || []);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: diceCount }).map((_, index) => {
        const value = displayResults[index];
        const result = results?.[index];
        
        return (
          <div
            key={index}
            className={cn(
              'dice text-lg font-bold',
              isRolling && 'dice-rolling',
              !isRolling && result?.isHit && 'dice-hit',
              !isRolling && result && !result.isHit && 'dice-miss',
              disabled && 'opacity-50'
            )}
          >
            {value || '?'}
          </div>
        );
      })}
    </div>
  );
}

// Mini dice for showing results inline
interface MiniDiceProps {
  value: number;
  isHit: boolean;
  size?: 'sm' | 'md';
}

export function MiniDice({ value, isHit, size = 'md' }: MiniDiceProps) {
  return (
    <div
      className={cn(
        'rounded flex items-center justify-center font-bold',
        size === 'md' ? 'w-8 h-8 text-lg' : 'w-6 h-6 text-sm',
        isHit ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
      )}
    >
      {value}
    </div>
  );
}

export default DiceRoller;
