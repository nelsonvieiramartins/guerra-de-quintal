'use client';

import { Monster } from '@/data/monsters';
import { cn } from '@/lib/utils';

interface MonsterCardProps {
  monster: Monster;
  selected?: boolean;
  onClick?: () => void;
  showFullInfo?: boolean;
  currentHp?: number;
  compact?: boolean;
}

export function MonsterCard({
  monster,
  selected,
  onClick,
  showFullInfo = true,
  currentHp,
  compact,
}: MonsterCardProps) {
  const displayHp = currentHp !== undefined ? currentHp : monster.hp;
  const hpPercentage = (displayHp / monster.maxHp) * 100;
  const isBoss = monster.category === 'boss';

  return (
    <div
      className={cn(
        'monster-card cursor-pointer transition-all duration-200',
        isBoss && 'boss-card',
        selected && 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-background',
        compact ? 'p-2' : 'p-4'
      )}
      onClick={onClick}
    >
      <div className={cn('flex items-start gap-3', compact && 'gap-2')}>
        {/* Monster Icon */}
        <div
          className={cn(
            'rounded-lg flex items-center justify-center',
            compact ? 'w-10 h-10 text-2xl' : 'w-14 h-14 text-3xl'
          )}
          style={{ backgroundColor: monster.imageColor }}
        >
          {monster.emoji}
        </div>

        {/* Monster Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={cn('font-bold text-[#f4e4bc]', compact ? 'text-sm' : 'text-lg')}>
              {monster.name}
            </h4>
            {isBoss && (
              <span className="text-xs bg-yellow-500 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                BOSS
              </span>
            )}
          </div>

          {/* HP Bar */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>HP</span>
              <span>{displayHp}/{monster.maxHp}</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          {showFullInfo && (
            <div className="flex gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <span>🏃</span>
                <span>Mov: {monster.movement}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Weakness & Resistance */}
      {showFullInfo && !compact && (
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-green-400">🟢 Fraqueza:</span>
            <span className="text-[#f4e4bc]/90">{monster.weakness.type}</span>
          </div>
          <p className="text-[#f4e4bc]/70 pl-6">{monster.weakness.description}</p>
          
          <div className="flex items-start gap-2">
            <span className="text-red-400">🔴 Resistência:</span>
            <span className="text-[#f4e4bc]/90">
              {monster.resistance.type}
              {monster.resistance.isImmune && ' (Imune)'}
            </span>
          </div>
          <p className="text-[#f4e4bc]/70 pl-6">{monster.resistance.description}</p>
        </div>
      )}

      {/* Compact weakness/resistance */}
      {compact && (
        <div className="mt-2 flex gap-2 text-[10px]">
          <span className="text-green-400">🟢{monster.weakness.type}</span>
          <span className="text-red-400">🔴{monster.resistance.type}</span>
        </div>
      )}
    </div>
  );
}

// Mini monster display for game board
interface MiniMonsterProps {
  monster: Monster;
  currentHp: number;
}

export function MiniMonster({ monster, currentHp }: MiniMonsterProps) {
  const hpPercentage = (currentHp / monster.maxHp) * 100;
  
  return (
    <div
      className={cn(
        'flex flex-col items-center p-1 rounded-lg',
        monster.category === 'boss' ? 'bg-purple-900/80' : 'bg-[#2c1810]/80'
      )}
    >
      <span className="text-xl">{monster.emoji}</span>
      <div className="w-8 h-1 bg-black/50 rounded-full mt-1">
        <div
          className="h-1 bg-green-500 rounded-full"
          style={{ width: `${hpPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default MonsterCard;
