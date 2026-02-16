// Game logic for Guerra de Quintal
import { Weapon, ElementType, getElementEmoji, getElementColor } from '@/data/recipes';
import { Monster, isElementWeakness, isElementResistance } from '@/data/monsters';

// Dice roll result
export interface DiceResult {
  value: number;
  isHit: boolean;
}

// Combat result
export interface CombatResult {
  diceRolls: DiceResult[];
  totalDamage: number;
  hits: number;
  misses: number;
  isWeakness: boolean;
  isResistance: boolean;
  extraDiceFromWeakness: number;
  reducedSuccessFromResistance: number;
  monsterDefeated: boolean;
  monsterRemainingHp: number;
}

// Roll a single d6 dice
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Check if a roll is a hit (4, 5, 6)
export function isHit(roll: number): boolean {
  return roll >= 4;
}

// Calculate extra dice from weakness
export function calculateExtraDice(weapon: Weapon, monster: Monster): number {
  if (isElementWeakness(weapon.element, monster.weakness.type)) {
    return 1;
  }
  return 0;
}

// Check if attack is resisted
export function isResisted(weapon: Weapon, monster: Monster): boolean {
  return isElementResistance(weapon.element, monster.resistance.type);
}

// Perform combat calculation
export function performCombat(weapon: Weapon, monster: Monster): CombatResult {
  // Calculate extra dice from weakness
  const extraDice = calculateExtraDice(weapon, monster);
  const totalDice = weapon.firepower + extraDice;
  
  // Roll all dice
  const diceRolls: DiceResult[] = [];
  for (let i = 0; i < totalDice; i++) {
    const roll = rollDice();
    diceRolls.push({
      value: roll,
      isHit: isHit(roll),
    });
  }
  
  // Calculate hits (with resistance reduction)
  const resisted = isResisted(weapon, monster);
  let hits = diceRolls.filter(d => d.isHit).length;
  
  // Apply resistance (-1 success)
  if (resisted && hits > 0) {
    hits = Math.max(0, hits - 1);
  }
  
  // Calculate damage
  const totalDamage = hits;
  const misses = totalDice - diceRolls.filter(d => d.isHit).length;
  
  // Check if monster is defeated
  const remainingHp = Math.max(0, monster.hp - totalDamage);
  const monsterDefeated = remainingHp <= 0;
  
  return {
    diceRolls,
    totalDamage,
    hits,
    misses,
    isWeakness: extraDice > 0,
    isResistance: resisted,
    extraDiceFromWeakness: extraDice,
    reducedSuccessFromResistance: resisted ? 1 : 0,
    monsterDefeated,
    monsterRemainingHp: remainingHp,
  };
}

// Game phases
export type GamePhase = 'setup' | 'playing' | 'victory' | 'defeat';

// Path types (3 paths through the yard)
export type Path = 'left' | 'center' | 'right';

// Room types (3 rooms in the house)
export type Room = 'bedroom' | 'kitchen' | 'living';

// Zone types for positioning
export type Zone = 'street' | 'yard' | 'house';

// Placed weapon on the board
export interface PlacedWeapon {
  id: string;
  weaponId: string;
  path: Path;           // Which path it's defending
  zone: Zone;           // yard or house
  position: number;
}

// Monster in play
export interface MonsterInPlay {
  id: string;
  monsterId: string;
  currentHp: number;
  path: Path;           // Which path it's attacking through
  zone: Zone;           // Current zone
  targetRoom: Room;     // Which room it's trying to reach
  position: number;
}

// Game state
export interface GameState {
  phase: GamePhase;
  currentTurn: number;
  maxTurns: number;
  placedWeapons: PlacedWeapon[];
  monsters: MonsterInPlay[];
  monstersDefeated: number;
  monstersEscaped: number;
  maxEscaped: number;
  revealedPaths: Path[];  // Paths that have been revealed (monsters spawned)
}

// Path and Room info
export const PATHS: Path[] = ['left', 'center', 'right'];
export const ROOMS: Room[] = ['bedroom', 'kitchen', 'living'];

export const PATH_NAMES: Record<Path, string> = {
  left: 'Caminho Esquerdo',
  center: 'Caminho Central',
  right: 'Caminho Direito',
};

export const PATH_ICONS: Record<Path, string> = {
  left: '⬅️',
  center: '⬆️',
  right: '➡️',
};

export const ROOM_NAMES: Record<Room, string> = {
  bedroom: 'Quarto',
  kitchen: 'Cozinha',
  living: 'Sala',
};

export const ROOM_ICONS: Record<Room, string> = {
  bedroom: '🛏️',
  kitchen: '🍳',
  living: '🛋️',
};

// Map paths to rooms (left path -> bedroom, center -> kitchen, right -> living)
export const PATH_TO_ROOM: Record<Path, Room> = {
  left: 'bedroom',
  center: 'kitchen',
  right: 'living',
};

// Initialize game state
export function initGameState(): GameState {
  return {
    phase: 'setup',
    currentTurn: 0,
    maxTurns: 10,
    placedWeapons: [],
    monsters: [],
    monstersDefeated: 0,
    monstersEscaped: 0,
    maxEscaped: 3,
    revealedPaths: [],
  };
}

// Get random path for monster
export function getRandomPath(): Path {
  const paths: Path[] = ['left', 'center', 'right'];
  return paths[Math.floor(Math.random() * paths.length)];
}

// Get random room for monster
export function getRandomRoom(): Room {
  const rooms: Room[] = ['bedroom', 'kitchen', 'living'];
  return rooms[Math.floor(Math.random() * rooms.length)];
}

// Spawn a random monster on a random path
export function spawnMonster(monsters: Monster[]): MonsterInPlay {
  const regularMonsters = monsters.filter(m => m.category === 'regular');
  const randomMonster = regularMonsters[Math.floor(Math.random() * regularMonsters.length)];
  const randomPath = getRandomPath();
  
  return {
    id: `monster-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    monsterId: randomMonster.id,
    currentHp: randomMonster.hp,
    path: randomPath,
    zone: 'street',
    targetRoom: PATH_TO_ROOM[randomPath],
    position: 0,
  };
}

// Move monster to next zone
export function moveMonster(monster: MonsterInPlay): MonsterInPlay {
  const zones: Zone[] = ['street', 'yard', 'house'];
  const currentIndex = zones.indexOf(monster.zone);
  
  if (currentIndex < zones.length - 1) {
    return {
      ...monster,
      zone: zones[currentIndex + 1],
      position: monster.position + 1,
    };
  }
  
  return monster;
}

// Get zone name in Portuguese
export function getZoneName(zone: Zone): string {
  switch (zone) {
    case 'street':
      return 'Rua';
    case 'yard':
      return 'Quintal';
    case 'house':
      return 'Casa';
    default:
      return 'Desconhecido';
  }
}

// Get zone color
export function getZoneColor(zone: Zone): string {
  switch (zone) {
    case 'street':
      return '#6B7280';
    case 'yard':
      return '#22C55E';
    case 'house':
      return '#8B4513';
    default:
      return '#4B5563';
  }
}

// Process game turn
export function processTurn(
  state: GameState,
  monsters: Monster[],
  weapons: Weapon[]
): {
  newState: GameState;
  combatLog: { weapon: string; monster: string; damage: number; path: Path }[];
  escapedMonsters: string[];
} {
  const combatLog: { weapon: string; monster: string; damage: number; path: Path }[] = [];
  const escapedMonsters: string[] = [];
  
  let newState = { ...state };
  
  // Monsters in house escape (they reached their target room)
  const escapedThisTurn = newState.monsters.filter(m => m.zone === 'house');
  escapedMonsters.push(...escapedThisTurn.map(m => m.id));
  newState.monstersEscaped += escapedThisTurn.length;
  
  // Update revealed paths
  const newRevealedPaths = [...newState.revealedPaths];
  for (const monster of newState.monsters) {
    if (!newRevealedPaths.includes(monster.path)) {
      newRevealedPaths.push(monster.path);
    }
  }
  newState.revealedPaths = newRevealedPaths;
  
  // Remove escaped monsters
  newState.monsters = newState.monsters.filter(m => m.zone !== 'house');
  
  // Weapons attack monsters in their path and zone
  const updatedMonsters = [...newState.monsters];
  
  for (const placedWeapon of newState.placedWeapons) {
    const weapon = weapons.find(w => w.id === placedWeapon.weaponId);
    if (!weapon) continue;
    
    // Find monsters in the same path and zone
    const monstersInPath = updatedMonsters.filter(
      m => m.path === placedWeapon.path && m.zone === placedWeapon.zone && m.currentHp > 0
    );
    
    for (const monsterInPlay of monstersInPath) {
      const monster = monsters.find(m => m.id === monsterInPlay.monsterId);
      if (!monster || monsterInPlay.currentHp <= 0) continue;
      
      // Create a temporary monster with current HP for combat
      const currentMonster = { ...monster, hp: monsterInPlay.currentHp };
      const result = performCombat(weapon, currentMonster);
      
      // Update monster HP
      const monsterIndex = updatedMonsters.findIndex(m => m.id === monsterInPlay.id);
      if (monsterIndex >= 0) {
        updatedMonsters[monsterIndex].currentHp = result.monsterRemainingHp;
        
        combatLog.push({
          weapon: weapon.name,
          monster: monster.name,
          damage: result.totalDamage,
          path: placedWeapon.path,
        });
        
        if (result.monsterDefeated) {
          newState.monstersDefeated++;
        }
      }
    }
  }
  
  // Remove defeated monsters
  newState.monsters = updatedMonsters.filter(m => m.currentHp > 0);
  
  // Move remaining monsters
  newState.monsters = newState.monsters.map(m => moveMonster(m));
  
  // Spawn new monsters (increasing chance as game progresses)
  const spawnChance = 0.4 + (newState.currentTurn * 0.05); // 40% + 5% per turn
  if (Math.random() < spawnChance && newState.monsters.length < 6) {
    newState.monsters.push(spawnMonster(monsters));
  }
  
  // Check win/lose conditions
  if (newState.monstersEscaped >= newState.maxEscaped) {
    newState.phase = 'defeat';
  } else if (newState.currentTurn >= newState.maxTurns && newState.monsters.length === 0) {
    newState.phase = 'victory';
  } else {
    newState.currentTurn++;
    
    if (newState.currentTurn >= newState.maxTurns) {
      newState.phase = newState.monstersEscaped < newState.maxEscaped ? 'victory' : 'defeat';
    }
  }
  
  return { newState, combatLog, escapedMonsters };
}

// Element names in Portuguese
export function getElementName(element: ElementType): string {
  switch (element) {
    case 'physical':
      return 'Físico';
    case 'fire':
      return 'Fogo';
    case 'water':
      return 'Água';
    case 'electric':
      return 'Elétrico';
    case 'ice':
      return 'Gelo';
    case 'earth':
      return 'Terra';
    case 'sound':
      return 'Som';
    default:
      return 'Desconhecido';
  }
}

export { getElementEmoji, getElementColor };
