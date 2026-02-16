'use client';

import { useState } from 'react';
import { Card, CardType, getCardsByType } from '@/data/cards';
import { getWeaponByCards, weapons, getElementEmoji, getElementColor, getElementName } from '@/data/recipes';
import { GameCard, WeaponCard } from './GameCard';
import { cn } from '@/lib/utils';

const cardTypeLabels: Record<CardType, string> = {
  essential: 'Item Essencial',
  base: 'Base',
  basic: 'Item Básico',
  trigger: 'Gatilho',
};

const cardTypeDescriptions: Record<CardType, string> = {
  essential: 'Escolha o item principal para sua arma',
  base: 'Escolha a base ou suporte',
  basic: 'Escolha o material básico ou elemento',
  trigger: 'Escolha o mecanismo de ativação',
};

export function CraftingCalculator() {
  const [selectedCards, setSelectedCards] = useState<Record<CardType, Card | null>>({
    essential: null,
    base: null,
    basic: null,
    trigger: null,
  });
  const [activeTab, setActiveTab] = useState<CardType>('essential');
  const [showRecipeBook, setShowRecipeBook] = useState(false);

  const handleCardSelect = (card: Card) => {
    setSelectedCards(prev => ({
      ...prev,
      [activeTab]: card,
    }));
  };

  const handleCardDeselect = (type: CardType) => {
    setSelectedCards(prev => ({
      ...prev,
      [type]: null,
    }));
  };

  const craftResult = selectedCards.essential && selectedCards.base && selectedCards.basic && selectedCards.trigger
    ? getWeaponByCards(
        selectedCards.essential.id,
        selectedCards.base.id,
        selectedCards.basic.id,
        selectedCards.trigger.id
      )
    : null;

  const isComplete = selectedCards.essential && selectedCards.base && selectedCards.basic && selectedCards.trigger;

  const tabs: CardType[] = ['essential', 'base', 'basic', 'trigger'];

  const resetCrafting = () => {
    setSelectedCards({
      essential: null,
      base: null,
      basic: null,
      trigger: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="section-title text-2xl mb-2">Calculadora de Crafting</h2>
        <p className="text-muted-foreground text-sm">
          Selecione 4 cartas para criar uma arma: Essencial + Base + Básico + Gatilho
        </p>
      </div>

      {/* Selected Cards Display */}
      <div className="paper-card rounded-lg p-4">
        <h3 className="font-bold text-primary mb-3 text-center">Cartas Selecionadas</h3>
        <div className="grid grid-cols-4 gap-2">
          {tabs.map(type => (
            <div key={type} className="flex flex-col items-center">
              <div
                className={cn(
                  'w-full min-h-[80px] rounded-lg flex items-center justify-center',
                  'border-2 border-dashed',
                  selectedCards[type] ? 'border-primary bg-primary/10' : 'border-muted-foreground/30 bg-muted/50'
                )}
                onClick={() => selectedCards[type] && handleCardDeselect(type)}
              >
                {selectedCards[type] ? (
                  <div className="text-center p-2">
                    <div className="text-2xl">{selectedCards[type]!.emoji}</div>
                    <div className="text-xs font-medium mt-1">{selectedCards[type]!.name}</div>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-xs text-center p-2">
                    {cardTypeLabels[type]}
                  </div>
                )}
              </div>
              <span className="text-xs mt-1 text-muted-foreground">{cardTypeLabels[type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Selection */}
      <div className="flex gap-1 justify-center">
        {tabs.map(type => (
          <button
            key={type}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              activeTab === type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            onClick={() => setActiveTab(type)}
          >
            {cardTypeLabels[type]}
          </button>
        ))}
      </div>

      {/* Card Selection */}
      <div className="paper-card rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          {cardTypeDescriptions[activeTab]}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-64 overflow-y-auto custom-scrollbar p-1">
          {getCardsByType(activeTab).map(card => (
            <GameCard
              key={card.id}
              card={card}
              isSelected={selectedCards[activeTab]?.id === card.id}
              onClick={() => handleCardSelect(card)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Craft Result */}
      <div className="paper-card rounded-lg p-4">
        <h3 className="font-bold text-primary mb-3 text-center">Resultado</h3>
        {isComplete ? (
          craftResult ? (
            <div className="space-y-3">
              <WeaponCard
                name={craftResult.name}
                description={craftResult.description}
                firepower={craftResult.firepower}
                element={getElementName(craftResult.element)}
                elementEmoji={getElementEmoji(craftResult.element)}
                elementColor={getElementColor(craftResult.element)}
                imagePath={craftResult.imagePath}
              />
              <div className="text-center">
                <button
                  onClick={resetCrafting}
                  className="btn-game px-4 py-2 rounded-lg"
                >
                  Nova Combinação
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-muted-foreground">Combinação inválida!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Tente outra combinação de cartas.
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <div className="text-4xl mb-2">🔧</div>
            <p>Selecione todas as 4 cartas para ver o resultado</p>
          </div>
        )}
      </div>

      {/* Recipe Book Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowRecipeBook(!showRecipeBook)}
          className="text-primary underline text-sm hover:no-underline"
        >
          {showRecipeBook ? '▼ Esconder Receitas' : '▶ Ver Livro de Receitas'}
        </button>
      </div>

      {/* Recipe Book */}
      {showRecipeBook && (
        <div className="paper-card rounded-lg p-4">
          <h3 className="font-bold text-primary mb-3 text-center">Livro de Receitas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto custom-scrollbar p-1">
            {weapons.map(weapon => (
              <WeaponCard
                key={weapon.id}
                name={weapon.name}
                description={weapon.description}
                firepower={weapon.firepower}
                element={getElementName(weapon.element)}
                elementEmoji={getElementEmoji(weapon.element)}
                elementColor={getElementColor(weapon.element)}
                imagePath={weapon.imagePath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CraftingCalculator;
