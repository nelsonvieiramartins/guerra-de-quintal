// Monster data for Guerra de Quintal
import { ElementType } from './recipes';

export type MonsterCategory = 'regular' | 'boss';

export interface MonsterWeakness {
  type: string;
  description: string;
}

export interface MonsterResistance {
  type: string;
  description: string;
  isImmune?: boolean;
}

export interface Monster {
  id: string;
  name: string;
  description: string;
  hp: number;
  maxHp: number;
  movement: number;
  weakness: MonsterWeakness;
  resistance: MonsterResistance;
  category: MonsterCategory;
  emoji: string;
  imageColor: string;
}

// All monsters in the game
export const monsters: Monster[] = [
  {
    id: 'monster-1',
    name: 'Saci',
    description: 'O travesso menino de uma perna só que adora fazer travessuras. Corre em círculos criando redemoinhos de poeira.',
    hp: 3,
    maxHp: 3,
    movement: 3,
    weakness: {
      type: 'Armadilhas de Chão',
      description: 'Armadilhas no chão tropeçam sua única perna (+1 dado)',
    },
    resistance: {
      type: 'Físico',
      description: 'Seu corpo etéreo absorve golpes físicos (-1 sucesso)',
    },
    category: 'regular',
    emoji: '🌀',
    imageColor: '#8B4513',
  },
  {
    id: 'monster-2',
    name: 'Mula Sem Cabeça',
    description: 'A maldita mula que galopa pelo quintal soltando fogo pelas narinas. Não tenha medo do fogo, tenha medo dos cascos!',
    hp: 5,
    maxHp: 5,
    movement: 2,
    weakness: {
      type: 'Água/Som/Lama',
      description: 'Água apaga seu fogo interno, som a assusta, lama a faz escorregar (+1 dado)',
    },
    resistance: {
      type: 'Fogo',
      description: 'Completamente imune a ataques de fogo',
      isImmune: true,
    },
    category: 'regular',
    emoji: '🐴',
    imageColor: '#2C1810',
  },
  {
    id: 'monster-3',
    name: 'Capelobo',
    description: 'Criatura híbrida com corpo de homem e cabeça de cachorro ou porco. Protege as florestas e ataca caçadores.',
    hp: 4,
    maxHp: 4,
    movement: 1,
    weakness: {
      type: 'Eletricidade/Perfuração',
      description: 'Choques elétricos e armas perfurantes são especialmente eficazes (+1 dado)',
    },
    resistance: {
      type: 'Físico Leve',
      description: 'Sua pele grossa reduz danos físicos leves (-1 sucesso)',
    },
    category: 'regular',
    emoji: '🐕',
    imageColor: '#4A3728',
  },
  {
    id: 'monster-4',
    name: 'Curupira',
    description: 'O protetor das florestas com pés virados para trás. Conhecido por confundir caçadores com suas pegadas invertidas.',
    hp: 3,
    maxHp: 3,
    movement: 2,
    weakness: {
      type: 'Armadilhas Manuais',
      description: 'Armadilhas que requerem ativação manual o pegam desprevenido (+1 dado)',
    },
    resistance: {
      type: 'Sensores',
      description: 'Seus sentidos aguçados detectam armadilhas automáticas (-1 sucesso)',
    },
    category: 'regular',
    emoji: '🌲',
    imageColor: '#228B22',
  },
  {
    id: 'monster-5',
    name: 'Boitatá',
    description: 'A serpente de fogo que protege as matas. Seus olhos brilham como tochas e seu corpo é feito de chamas.',
    hp: 4,
    maxHp: 4,
    movement: 2,
    weakness: {
      type: 'Gelo',
      description: 'Ataques de gelo resfriam seu corpo flamejante (+1 dado)',
    },
    resistance: {
      type: 'Fogo/Sensores',
      description: 'Imune a fogo e sensores de calor não a detectam (-1 sucesso)',
    },
    category: 'regular',
    emoji: '🔥',
    imageColor: '#FF4500',
  },
  {
    id: 'monster-6',
    name: 'Cuca',
    description: 'A bruxa mais temida do folclore brasileiro! Com aparência de velha feiticeira, ela ronda as noites em busca de crianças desobedientes.',
    hp: 10,
    maxHp: 10,
    movement: 1,
    weakness: {
      type: 'Dano Combinado',
      description: 'Só pode ser ferida quando dois ou mais tipos de dano são aplicados no mesmo turno (+1 dado)',
    },
    resistance: {
      type: 'Tudo Isolado',
      description: 'Imune a qualquer tipo de dano quando atacada isoladamente',
    },
    category: 'boss',
    emoji: '🧙‍♀️',
    imageColor: '#4B0082',
  },
];

// Get monster by ID
export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}

// Check if element matches weakness
export function isElementWeakness(element: ElementType, weakness: string): boolean {
  const weaknessMap: Record<ElementType, string[]> = {
    physical: ['Físico', 'Armadilhas', 'Perfuração'],
    fire: ['Água', 'Gelo'],
    water: ['Fogo', 'Eletricidade'],
    electric: ['Eletricidade', 'Choque'],
    ice: ['Fogo', 'Gelo'],
    earth: ['Armadilhas de Chão', 'Lama', 'Água'],
    sound: ['Som', 'Água'],
  };
  
  const weaknessTypes = weaknessMap[element] || [];
  return weaknessTypes.some(type => weakness.toLowerCase().includes(type.toLowerCase()));
}

// Check if element matches resistance
export function isElementResistance(element: ElementType, resistance: string): boolean {
  const resistanceMap: Record<ElementType, string[]> = {
    physical: ['Físico', 'Sensores'],
    fire: ['Fogo', 'Calor'],
    water: ['Água'],
    electric: ['Eletricidade'],
    ice: ['Gelo', 'Frio'],
    earth: ['Terra', 'Lama'],
    sound: ['Som'],
  };
  
  const resistanceTypes = resistanceMap[element] || [];
  return resistanceTypes.some(type => resistance.toLowerCase().includes(type.toLowerCase()));
}
