'use client';

import { useState, useCallback } from 'react';
import { weapons, getWeaponById, getElementEmoji } from '@/data/recipes';
import { monsters, getMonsterById } from '@/data/monsters';
import { 
  GameState, 
  Zone, 
  Path,
  PlacedWeapon, 
  initGameState, 
  spawnMonster, 
  processTurn,
  PATHS,
  PATH_NAMES,
  PATH_ICONS,
  ROOM_NAMES,
  ROOM_ICONS,
  PATH_TO_ROOM,
} from '@/lib/gameLogic';
import { cn } from '@/lib/utils';

interface CombatLogEntry {
  turn: number;
  weapon: string;
  monster: string;
  damage: number;
  path: Path;
}

export default function MiniGame() {
  const [gameState, setGameState] = useState<GameState>(initGameState);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [combatLog, setCombatLog] = useState<CombatLogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Place weapon
  const placeWeapon = useCallback((path: Path, zone: Zone) => {
    if (gameState.phase !== 'setup' || !selectedWeapon) return;
    
    const exists = gameState.placedWeapons.find(w => w.path === path && w.zone === zone);
    if (exists) return;

    const newWeapon: PlacedWeapon = {
      id: `weapon-${Date.now()}`,
      weaponId: selectedWeapon,
      path,
      zone,
      position: 0,
    };

    setGameState(prev => ({
      ...prev,
      placedWeapons: [...prev.placedWeapons, newWeapon],
    }));
    setSelectedWeapon(null);
  }, [selectedWeapon, gameState.phase, gameState.placedWeapons]);

  // Remove weapon
  const removeWeapon = useCallback((id: string) => {
    setGameState(prev => ({
      ...prev,
      placedWeapons: prev.placedWeapons.filter(w => w.id !== id),
    }));
  }, []);

  // Start game
  const startGame = useCallback(() => {
    if (gameState.placedWeapons.length < 3) return;
    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      currentTurn: 1,
      monsters: [spawnMonster(monsters)],
    }));
    setCombatLog([]);
  }, [gameState.placedWeapons.length]);

  // Next turn
  const nextTurn = useCallback(async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 300));
    
    const { newState, combatLog: logs } = processTurn(gameState, monsters, weapons);
    
    setCombatLog(prev => [...prev, ...logs.map(l => ({ turn: gameState.currentTurn, ...l }))]);
    setGameState(newState);
    setIsProcessing(false);
  }, [gameState, isProcessing]);

  // Reset
  const reset = useCallback(() => {
    setGameState(initGameState());
    setCombatLog([]);
    setSelectedWeapon(null);
  }, []);

  // Helpers
  const getWeaponAt = (path: Path, zone: Zone) => 
    gameState.placedWeapons.find(w => w.path === path && w.zone === zone);
  
  const getMonstersAt = (path: Path, zone: Zone) => 
    gameState.monsters.filter(m => m.path === path && m.zone === zone);

  const placed = gameState.placedWeapons.length;

  // Victory
  if (gameState.phase === 'victory') {
    return (
      <div className="text-center py-8">
        <div className="text-8xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-4xl font-bold text-green-600 mb-2">VITÓRIA!</h2>
        <p className="text-lg text-muted-foreground mb-6">Você defendeu sua casa!</p>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{gameState.monstersDefeated}</div>
            <div className="text-sm">Derrotados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{gameState.monstersEscaped}</div>
            <div className="text-sm">Escaparam</div>
          </div>
        </div>
        <button onClick={reset} className="btn-game px-8 py-3 rounded-lg text-lg">🔄 Jogar Novamente</button>
      </div>
    );
  }

  // Defeat
  if (gameState.phase === 'defeat') {
    return (
      <div className="text-center py-8">
        <div className="text-8xl mb-4">💀</div>
        <h2 className="text-4xl font-bold text-red-600 mb-2">DERROTA!</h2>
        <p className="text-lg text-muted-foreground mb-6">Muitos monstros invadiram!</p>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{gameState.monstersDefeated}</div>
            <div className="text-sm">Derrotados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{gameState.monstersEscaped}</div>
            <div className="text-sm">Invadiram</div>
          </div>
        </div>
        <button onClick={reset} className="btn-game px-8 py-3 rounded-lg text-lg">🔄 Tentar Novamente</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-1">🏠 Guerra de Quintal</h2>
        <p className="text-sm text-muted-foreground">
          {gameState.phase === 'setup' ? 'Posicione armas nos 3 caminhos!' : 'Defenda sua casa!'}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center paper-card rounded-lg p-3">
        <div className="flex gap-4">
          <div className="text-sm">Turno: <b>{gameState.currentTurn}/{gameState.maxTurns}</b></div>
          <div className="text-sm">Monstros: <b>{gameState.monsters.length}</b></div>
        </div>
        <div className="flex gap-3">
          <div className="text-sm text-green-600">✓ {gameState.monstersDefeated}</div>
          <div className="text-sm text-red-500">✗ {gameState.monstersEscaped}/{gameState.maxEscaped}</div>
        </div>
      </div>

      {/* Board */}
      <div className="paper-card rounded-lg p-4">
        {/* Header row */}
        <div className="grid grid-cols-5 gap-2 text-center text-xs text-muted-foreground mb-2">
          <div>Caminho</div>
          <div>🛣️ Rua</div>
          <div>🌳 Quintal</div>
          <div>🏠 Casa</div>
          <div>📍 Cômodo</div>
        </div>

        {/* Paths */}
        {PATHS.map(path => {
          const hasMonsters = gameState.monsters.some(m => m.path === path);
          return (
            <div key={path} className="grid grid-cols-5 gap-2 mb-2">
              {/* Path name */}
              <div className={cn(
                "flex items-center justify-center gap-1 rounded p-2 text-sm font-medium",
                hasMonsters ? "bg-red-100 text-red-700" : "bg-muted"
              )}>
                <span>{PATH_ICONS[path]}</span>
                <span className="hidden sm:inline">{PATH_NAMES[path]}</span>
              </div>

              {/* Street */}
              <div className="bg-gray-400 rounded p-2 min-h-[60px]">
                {getMonstersAt(path, 'street').map(m => {
                  const mon = getMonsterById(m.monsterId);
                  return mon ? (
                    <span key={m.id} className="text-lg" title={mon.name}>{mon.emoji}</span>
                  ) : null;
                })}
              </div>

              {/* Yard */}
              <div 
                className={cn(
                  "bg-green-600 rounded p-2 min-h-[60px] cursor-pointer",
                  gameState.phase === 'setup' && selectedWeapon && !getWeaponAt(path, 'yard') && "ring-2 ring-yellow-400"
                )}
                onClick={() => placeWeapon(path, 'yard')}
              >
                {getWeaponAt(path, 'yard') && (() => {
                  const w = getWeaponAt(path, 'yard')!;
                  const weapon = getWeaponById(w.weaponId);
                  return weapon ? (
                    <div 
                      className="bg-white rounded px-2 py-1 text-xs flex items-center gap-1"
                      onClick={e => { e.stopPropagation(); removeWeapon(w.id); }}
                    >
                      {getElementEmoji(weapon.element)} {weapon.firepower}d ×
                    </div>
                  ) : null;
                })()}
                {getMonstersAt(path, 'yard').map(m => {
                  const mon = getMonsterById(m.monsterId);
                  return mon ? (
                    <span key={m.id} className="text-lg ml-1" title={mon.name}>{mon.emoji}</span>
                  ) : null;
                })}
              </div>

              {/* House */}
              <div 
                className={cn(
                  "bg-amber-700 rounded p-2 min-h-[60px] cursor-pointer",
                  gameState.phase === 'setup' && selectedWeapon && !getWeaponAt(path, 'house') && "ring-2 ring-yellow-400"
                )}
                onClick={() => placeWeapon(path, 'house')}
              >
                {getWeaponAt(path, 'house') && (() => {
                  const w = getWeaponAt(path, 'house')!;
                  const weapon = getWeaponById(w.weaponId);
                  return weapon ? (
                    <div 
                      className="bg-white rounded px-2 py-1 text-xs flex items-center gap-1"
                      onClick={e => { e.stopPropagation(); removeWeapon(w.id); }}
                    >
                      {getElementEmoji(weapon.element)} {weapon.firepower}d ×
                    </div>
                  ) : null;
                })()}
                {getMonstersAt(path, 'house').map(m => {
                  const mon = getMonsterById(m.monsterId);
                  return mon ? (
                    <span key={m.id} className="text-lg ml-1 animate-pulse" title={mon.name}>{mon.emoji}</span>
                  ) : null;
                })}
              </div>

              {/* Room */}
              <div className="bg-purple-100 rounded p-2 flex items-center justify-center text-sm">
                {ROOM_ICONS[PATH_TO_ROOM[path]]} {ROOM_NAMES[PATH_TO_ROOM[path]]}
              </div>
            </div>
          );
        })}

        {/* Warning */}
        {gameState.monsters.some(m => m.zone === 'house') && gameState.phase === 'playing' && (
          <div className="mt-2 bg-red-100 border-2 border-red-400 text-red-700 p-2 rounded text-center font-bold animate-pulse">
            ⚠️ MONSTROS NA CASA!
          </div>
        )}
      </div>

      {/* Weapon Selection */}
      {gameState.phase === 'setup' && (
        <div className="paper-card rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-primary">🔧 Arsenal</h3>
            <span className="text-sm">{placed}/6 armas (mín. 3)</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-32 overflow-y-auto">
            {weapons.map(w => {
              const count = gameState.placedWeapons.filter(p => p.weaponId === w.id).length;
              const canPlace = count < 2;
              return (
                <div
                  key={w.id}
                  className={cn(
                    "p-2 rounded border-2 text-center cursor-pointer",
                    selectedWeapon === w.id ? "border-primary bg-primary/20" : 
                    canPlace ? "border-transparent bg-muted/50 hover:bg-muted" : "opacity-50"
                  )}
                  onClick={() => canPlace && setSelectedWeapon(w.id)}
                >
                  <div className="text-xl">{getElementEmoji(w.element)}</div>
                  <div className="text-[10px] truncate">{w.name}</div>
                  <div className="text-[10px]">⚔️{w.firepower}d</div>
                </div>
              );
            })}
          </div>
          {selectedWeapon && (
            <div className="mt-2 text-center text-sm bg-muted rounded p-2">
              📍 Clique no <strong>Quintal</strong> ou <strong>Casa</strong> de um caminho!
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3">
        {gameState.phase === 'setup' && (
          <>
            <button 
              onClick={startGame}
              disabled={placed < 3}
              className={cn(
                "px-6 py-2 rounded-lg font-bold",
                placed >= 3 ? "btn-game" : "bg-muted opacity-50"
              )}
            >
              ▶️ Iniciar ({placed}/3)
            </button>
            <button onClick={reset} className="px-4 py-2 rounded-lg bg-muted">🔄</button>
          </>
        )}
        {gameState.phase === 'playing' && (
          <>
            <button 
              onClick={nextTurn}
              disabled={isProcessing}
              className="btn-game px-6 py-2 rounded-lg font-bold"
            >
              {isProcessing ? '⏳...' : '⏭️ Próximo Turno'}
            </button>
            <button onClick={reset} className="px-4 py-2 rounded-lg bg-muted">🔄</button>
          </>
        )}
      </div>

      {/* Log */}
      {combatLog.length > 0 && (
        <div className="paper-card rounded-lg p-4">
          <h3 className="font-bold text-primary mb-2">📜 Combate</h3>
          <div className="max-h-24 overflow-y-auto space-y-1 text-sm">
            {[...combatLog].reverse().slice(0, 8).map((e, i) => (
              <div key={i} className={cn("flex gap-2 p-1 rounded", e.damage > 0 ? "bg-green-50" : "bg-red-50")}>
                <span className="text-xs bg-muted px-1 rounded">T{e.turn}</span>
                <span>{PATH_ICONS[e.path]}</span>
                <span>{e.weapon}</span>
                <span>→</span>
                <span>{e.monster}</span>
                <span className={e.damage > 0 ? "text-red-500 font-bold ml-auto" : "text-muted ml-auto"}>
                  {e.damage > 0 ? `-${e.damage}` : '🛡️'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules */}
      <div className="paper-card rounded-lg p-4">
        <h3 className="font-bold text-primary mb-2">📖 Regras</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>🎯 <strong>3 caminhos</strong> levam aos cômodos da casa</p>
          <p>🎲 Monstros aparecem em caminhos <strong>aleatórios</strong></p>
          <p>⚔️ Posicione armas no Quintal ou Casa de cada caminho</p>
          <p>💀 Se 3 monstros chegarem aos cômodos, você perde!</p>
        </div>
      </div>
    </div>
  );
}
