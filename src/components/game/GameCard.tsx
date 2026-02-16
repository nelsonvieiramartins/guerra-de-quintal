'use client';

import { Card as CardType, CardType as CardTypeEnum } from '@/data/cards';
import { cn } from '@/lib/utils';

interface GameCardProps {
  card: CardType;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

const typeColors: Record<CardTypeEnum, { bg: string; border: string; text: string }> = {
  essential: { bg: 'bg-amber-100', border: 'border-amber-600', text: 'text-amber-800' },
  base: { bg: 'bg-emerald-100', border: 'border-emerald-600', text: 'text-emerald-800' },
  basic: { bg: 'bg-sky-100', border: 'border-sky-600', text: 'text-sky-800' },
  trigger: { bg: 'bg-rose-100', border: 'border-rose-600', text: 'text-rose-800' },
};

const typeLabels: Record<CardTypeEnum, string> = {
  essential: 'Essencial',
  base: 'Base',
  basic: 'Básico',
  trigger: 'Gatilho',
};

export function GameCard({ card, isSelected, onClick, disabled, compact }: GameCardProps) {
  const colors = typeColors[card.type];

  return (
    <div
      className={cn(
        'game-card cursor-pointer transition-all duration-200',
        isSelected && 'game-card-selected',
        disabled && 'opacity-50 cursor-not-allowed',
        colors.bg,
        colors.border,
        'border-2',
        'rounded-lg',
        compact ? 'p-2' : 'p-3'
      )}
      onClick={() => !disabled && onClick?.()}
    >
      <div className={cn('flex flex-col items-center gap-1', compact ? 'text-xs' : 'text-sm')}>
        <span className={cn('text-2xl', compact && 'text-lg')}>{card.emoji}</span>
        <span className={cn('font-semibold text-center', colors.text, compact ? 'text-xs' : 'text-sm')}>
          {card.name}
        </span>
        {!compact && (
          <span className={cn('text-xs px-2 py-0.5 rounded-full', colors.border, 'border', colors.text)}>
            {typeLabels[card.type]}
          </span>
        )}
        {!compact && card.description && (
          <span className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
            {card.description}
          </span>
        )}
      </div>
    </div>
  );
}

// Weapon card for displaying crafted weapons
interface WeaponCardProps {
  name: string;
  description: string;
  firepower: number;
  element: string;
  elementEmoji: string;
  elementColor: string;
  imagePath?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function WeaponCard({
  name,
  description,
  firepower,
  element,
  elementEmoji,
  elementColor,
  imagePath,
  onClick,
  selected,
}: WeaponCardProps) {
  return (
    <div
      className={cn(
        'paper-card rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-lg',
        selected && 'ring-2 ring-primary ring-offset-2'
      )}
      onClick={onClick}
    >
      {imagePath && (
        <div className="w-full h-24 rounded overflow-hidden mb-2 bg-muted">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h4 className="font-bold text-primary mb-1">{name}</h4>
      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1">
          <span style={{ color: elementColor }}>{elementEmoji}</span>
          <span>{element}</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span>⚔️</span>
          <span>{firepower} dados</span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
