'use client';

import { useState, useEffect } from 'react';
import { weapons, getWeaponById, getElementEmoji, getElementColor, getElementName } from '@/data/recipes';
import { monsters, getMonsterById, Monster } from '@/data/monsters';
import { performCombat, CombatResult, DiceResult } from '@/lib/gameLogic';
import { WeaponCard } from './GameCard';
import { MonsterCard } from './MonsterCard';
import { DiceRoller } from './DiceRoller';
import { cn } from '@/lib/utils';

export function CombatSimulator() {
  const [selectedWeaponId, setSelectedWeaponId] = useState<string | null>(null);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [combatResult, setCombatResult] = useState<CombatResult | null>(null);
  const [monsterHp, setMonsterHp] = useState<number | null>(null);
  const [diceResults, setDiceResults] = useState<DiceResult[]>([]);

  const selectedWeapon = selectedWeaponId ? getWeaponById(selectedWeaponId) : null;
  const selectedMonster = selectedMonsterId ? getMonsterById(selectedMonsterId) : null;

  // Reset monster HP when selection changes - using a ref to track previous value
  const prevMonsterIdRef = useState<string | null>(null);
  
  if (selectedMonsterId !== prevMonsterIdRef[0]) {
    prevMonsterIdRef[1](selectedMonsterId);
    if (selectedMonster) {
      setMonsterHp(selectedMonster.hp);
      setCombatResult(null);
      setDiceResults([]);
    }
  }

  const handleCombat = async () => {
    if (!selectedWeapon || !selectedMonster) return;

    setIsRolling(true);
    setDiceResults([]);

    // Simulate rolling animation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create a monster with current HP for combat
    const currentMonster: Monster = {
      ...selectedMonster,
      hp: monsterHp ?? selectedMonster.hp,
    };

    const result = performCombat(selectedWeapon, currentMonster);
    
    setDiceResults(result.diceRolls);
    setCombatResult(result);
    setMonsterHp(result.monsterRemainingHp);
    setIsRolling(false);
  };

  const resetCombat = () => {
    if (selectedMonster) {
      setMonsterHp(selectedMonster.hp);
    }
    setCombatResult(null);
    setDiceResults([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="section-title text-2xl mb-2">Simulador de Combate</h2>
        <p className="text-muted-foreground text-sm">
          Selecione uma arma e um monstro para simular o combate
        </p>
      </div>

      {/* Selection Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weapon Selection */}
        <div className="paper-card rounded-lg p-4">
          <h3 className="font-bold text-primary mb-3 text-center">⚔️ Arma</h3>
          <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2 p-1">
            {weapons.map(weapon => (
              <div
                key={weapon.id}
                className={cn(
                  'p-2 rounded-lg cursor-pointer transition-all border-2',
                  selectedWeaponId === weapon.id
                    ? 'border-primary bg-primary/10'
                    : 'border-transparent bg-muted/50 hover:bg-muted'
                )}
                onClick={() => setSelectedWeaponId(weapon.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                    <img src={weapon.imagePath} alt={weapon.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{weapon.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span style={{ color: getElementColor(weapon.element) }}>
                        {getElementEmoji(weapon.element)} {getElementName(weapon.element)}
                      </span>
                      <span>•</span>
                      <span>⚔️ {weapon.firepower}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monster Selection */}
        <div className="paper-card rounded-lg p-4">
          <h3 className="font-bold text-primary mb-3 text-center">👹 Monstro</h3>
          <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2 p-1">
            {monsters.map(monster => (
              <MonsterCard
                key={monster.id}
                monster={monster}
                selected={selectedMonsterId === monster.id}
                onClick={() => setSelectedMonsterId(monster.id)}
                compact
                currentHp={selectedMonsterId === monster.id ? (monsterHp ?? monster.hp) : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selected Details */}
      {selectedWeapon && selectedMonster && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="paper-card rounded-lg p-3">
            <WeaponCard
              name={selectedWeapon.name}
              description={selectedWeapon.description}
              firepower={selectedWeapon.firepower}
              element={getElementName(selectedWeapon.element)}
              elementEmoji={getElementEmoji(selectedWeapon.element)}
              elementColor={getElementColor(selectedWeapon.element)}
              imagePath={selectedWeapon.imagePath}
            />
          </div>
          <div className="paper-card rounded-lg p-3">
            <MonsterCard
              monster={selectedMonster}
              showFullInfo
              currentHp={monsterHp ?? selectedMonster.hp}
            />
          </div>
        </div>
      )}

      {/* Combat Area */}
      {selectedWeapon && selectedMonster && (
        <div className="paper-card rounded-lg p-4">
          <h3 className="font-bold text-primary mb-3 text-center">🎲 Combate</h3>

          {/* Dice Display */}
          <div className="mb-4">
            <div className="text-center mb-2 text-sm">
              {isRolling ? (
                <span className="animate-pulse">Rolando dados...</span>
              ) : (
                <span>Poder de Fogo: {selectedWeapon.firepower} dados</span>
              )}
            </div>
            <DiceRoller
              isRolling={isRolling}
              diceCount={combatResult?.diceRolls.length ?? selectedWeapon.firepower}
              results={diceResults}
            />
          </div>

          {/* Combat Modifiers */}
          <div className="flex justify-center gap-4 mb-4 text-sm">
            {combatResult?.isWeakness && (
              <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded">
                <span>🟢</span>
                <span>Fraqueza: +1 dado</span>
              </div>
            )}
            {combatResult?.isResistance && (
              <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded">
                <span>🔴</span>
                <span>Resistência: -1 sucesso</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handleCombat}
              disabled={isRolling}
              className="btn-game px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {isRolling ? 'Rolando...' : '⚡ Atacar!'}
            </button>
            <button
              onClick={resetCombat}
              disabled={isRolling}
              className="px-6 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              🔄 Reset
            </button>
          </div>

          {/* Combat Result */}
          {combatResult && !isRolling && (
            <div className="mt-4 text-center">
              <div className="flex justify-center gap-4 mb-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{combatResult.hits}</div>
                  <div className="text-xs text-muted-foreground">Acertos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{combatResult.misses}</div>
                  <div className="text-xs text-muted-foreground">Falhas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{combatResult.totalDamage}</div>
                  <div className="text-xs text-muted-foreground">Dano Total</div>
                </div>
              </div>

              {combatResult.monsterDefeated ? (
                <div className="bg-green-100 text-green-800 rounded-lg p-3 font-bold">
                  🎉 MONSTRO DERROTADO!
                </div>
              ) : (
                <div className="bg-amber-100 text-amber-800 rounded-lg p-3">
                  <div className="font-medium">Monstro ainda vivo!</div>
                  <div className="text-sm">HP restante: {combatResult.monsterRemainingHp}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Combat Rules */}
      <div className="paper-card rounded-lg p-4">
        <h3 className="font-bold text-primary mb-2 text-center">📜 Regras de Combate</h3>
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-start gap-2">
            <span>🎲</span>
            <span><strong>Dado d6:</strong> 4, 5, 6 = Acerto (1 dano) | 1, 2, 3 = Falha</span>
          </div>
          <div className="flex items-start gap-2">
            <span>⚔️</span>
            <span><strong>Poder de Fogo:</strong> Quantidade de dados que você rola</span>
          </div>
          <div className="flex items-start gap-2">
            <span>🟢</span>
            <span><strong>Fraqueza:</strong> Elemento eficaz = +1 dado</span>
          </div>
          <div className="flex items-start gap-2">
            <span>🔴</span>
            <span><strong>Resistência:</strong> Elemento ineficaz = -1 sucesso</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombatSimulator;
