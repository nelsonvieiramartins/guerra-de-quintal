// Weapon recipes for Guerra de Quintal
import { Card } from './cards';

export type ElementType = 'physical' | 'fire' | 'water' | 'electric' | 'ice' | 'earth' | 'sound';

export interface Weapon {
  id: string;
  name: string;
  description: string;
  firepower: number; // Number of dice to roll
  element: ElementType;
  imagePath: string;
  essentialCard: string;
  baseCard: string;
  basicCard: string;
  triggerCard: string;
}

export interface Recipe {
  id: string;
  weapon: Weapon;
  requiredCards: {
    essential: string;
    base: string;
    basic: string;
    trigger: string;
  };
}

// All weapons in the game
export const weapons: Weapon[] = [
  {
    id: 'weapon-1',
    name: 'Sentinela Nerf',
    description: 'Uma pistola Nerf montada em um ventilador rotativo que dispara automaticamente quando detecta movimento.',
    firepower: 3,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_4eznj94eznj94ezn.png',
    essentialCard: 'essential-1',
    baseCard: 'base-1',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-2',
    name: 'Metralhadora Vulcan',
    description: 'A poderosa Nerf Vulcan montada em um tripé para defesa estática do quintal.',
    firepower: 5,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_5hzaly5hzaly5hza.png',
    essentialCard: 'essential-2',
    baseCard: 'base-2',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-3',
    name: 'Sentinela de Fogo',
    description: 'Um Super Soaker modificado que lança jatos de líquido inflamável.',
    firepower: 4,
    element: 'fire',
    imagePath: '/upload/Gemini_Generated_Image_4d06dj4d06dj4d06.png',
    essentialCard: 'essential-3',
    baseCard: 'base-2',
    basicCard: 'basic-2',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-4',
    name: 'Canhão de Tênis',
    description: 'Um canhão caseiro que dispara bolas de tênis com grande precisão.',
    firepower: 3,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_4y2eag4y2eag4y2e.png',
    essentialCard: 'essential-4',
    baseCard: 'base-3',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-5',
    name: 'Mina de Goma',
    description: 'Uma armadilha explosiva que libera uma geleca pegajosa impossível de remover.',
    firepower: 2,
    element: 'earth',
    imagePath: '/upload/Gemini_Generated_Image_cgubzpcgubzpcgub.png',
    essentialCard: 'essential-5',
    baseCard: 'base-4',
    basicCard: 'basic-3',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-6',
    name: 'Lançador de Geleca',
    description: 'Um dispositivo que lança projetis de gelatina grudenta.',
    firepower: 2,
    element: 'earth',
    imagePath: '/upload/Gemini_Generated_Image_cgubzpcgubzpcgub.png',
    essentialCard: 'essential-6',
    baseCard: 'base-5',
    basicCard: 'basic-4',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-7',
    name: 'Armadilha de Gude',
    description: 'Pote cheio de bolinhas de gude que fazem os inimigos escorregarem.',
    firepower: 1,
    element: 'earth',
    imagePath: '/upload/Gemini_Generated_Image_cgubzpcgubzpcgub.png',
    essentialCard: 'essential-7',
    baseCard: 'base-5',
    basicCard: 'basic-5',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-8',
    name: 'Morteiro D\'água',
    description: 'Um canhão de água caseiro feito com tubos de PVC.',
    firepower: 3,
    element: 'water',
    imagePath: '/upload/Gemini_Generated_Image_4y2eag4y2eag4y2e.png',
    essentialCard: 'essential-8',
    baseCard: 'base-6',
    basicCard: 'basic-6',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-9',
    name: 'Armadilha Espanador',
    description: 'Espanador montado em galhos que ativa com movimento, criando uma nuvem de poeira.',
    firepower: 1,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_2gm0hm2gm0hm2gm0.png',
    essentialCard: 'essential-9',
    baseCard: 'base-7',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-10',
    name: 'Teia de Aranha',
    description: 'Uma teia gigante de barbante que prende criaturas que tentam passar.',
    firepower: 2,
    element: 'earth',
    imagePath: '/upload/Gemini_Generated_Image_2gm0hm2gm0hm2gm0.png',
    essentialCard: 'essential-10',
    baseCard: 'base-8',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-11',
    name: 'Cobra de Mangueira',
    description: 'Mangueira configurada para esguichar água em criaturas que se aproximam.',
    firepower: 2,
    element: 'water',
    imagePath: '/upload/Gemini_Generated_Image_4y2eag4y2eag4y2e.png',
    essentialCard: 'essential-11',
    baseCard: 'base-9',
    basicCard: 'basic-6',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-12',
    name: 'Spray de Pimenta',
    description: 'Um pulverizador modificado que lança um jato de pimenta concentrada.',
    firepower: 3,
    element: 'fire',
    imagePath: '/upload/Gemini_Generated_Image_4d06dj4d06dj4d06.png',
    essentialCard: 'essential-12',
    baseCard: 'base-10',
    basicCard: 'basic-7',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-13',
    name: 'Espantalho',
    description: 'Um espantalho feito de roupas velhas que pode assustar criaturas menores.',
    firepower: 1,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_2gm0hm2gm0hm2gm0.png',
    essentialCard: 'essential-13',
    baseCard: 'base-5',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-14',
    name: 'Bambolê de Fogo',
    description: 'Um bambolê envolto em material inflamável que cria uma barreira de fogo.',
    firepower: 4,
    element: 'fire',
    imagePath: '/upload/Gemini_Generated_Image_4d06dj4d06dj4d06.png',
    essentialCard: 'essential-14',
    baseCard: 'base-11',
    basicCard: 'basic-8',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-15',
    name: 'Tapete de Brasas',
    description: 'Um tapete com carvão em brasa que queima qualquer coisa que pise nele.',
    firepower: 3,
    element: 'fire',
    imagePath: '/upload/Gemini_Generated_Image_4d06dj4d06dj4d06.png',
    essentialCard: 'essential-15',
    baseCard: 'base-12',
    basicCard: 'basic-9',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-16',
    name: 'Aspersor de Lama',
    description: 'Um aspersor modificado para lançar lama nos inimigos.',
    firepower: 2,
    element: 'earth',
    imagePath: '/upload/Gemini_Generated_Image_ax791yax791yax79.png',
    essentialCard: 'essential-16',
    baseCard: 'base-13',
    basicCard: 'basic-10',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-17',
    name: 'Pêndulo de Pneu',
    description: 'Um pneu balançando como pêndulo que atinge criaturas que passam.',
    firepower: 4,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_4j9jzj4j9jzj4j9j.png',
    essentialCard: 'essential-17',
    baseCard: 'base-14',
    basicCard: 'basic-11',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-18',
    name: 'Gravidade de Fogo',
    description: 'Um sistema de spray que jorra fogo por gravidade.',
    firepower: 3,
    element: 'fire',
    imagePath: '/upload/Gemini_Generated_Image_4d06dj4d06dj4d06.png',
    essentialCard: 'essential-18',
    baseCard: 'base-15',
    basicCard: 'basic-8',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-19',
    name: 'Besta de Lápis',
    description: 'Uma besta motorizada que dispara lápis afiados como flechas.',
    firepower: 3,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_4j9jzj4j9jzj4j9j.png',
    essentialCard: 'essential-19',
    baseCard: 'base-16',
    basicCard: 'basic-11',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-20',
    name: 'Lançador de Tênis',
    description: 'Uma roda de bicicleta modificada para lançar tênis velhos.',
    firepower: 3,
    element: 'physical',
    imagePath: '/upload/Gemini_Generated_Image_4y2eag4y2eag4y2e.png',
    essentialCard: 'essential-20',
    baseCard: 'base-17',
    basicCard: 'basic-12',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-21',
    name: 'Armadilha de Choque',
    description: 'Uma bateria de carro conectada a fios que dá um choque elétrico.',
    firepower: 4,
    element: 'electric',
    imagePath: '/upload/Gemini_Generated_Image_1ywl1x1ywl1x1ywl.png',
    essentialCard: 'essential-21',
    baseCard: 'base-18',
    basicCard: 'basic-1',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-22',
    name: 'Congelador CO2',
    description: 'Um extintor de CO2 modificado que congela tudo ao redor.',
    firepower: 4,
    element: 'ice',
    imagePath: '/upload/Gemini_Generated_Image_ax791yax791yax79.png',
    essentialCard: 'essential-22',
    baseCard: 'base-19',
    basicCard: 'basic-6',
    triggerCard: 'trigger-1',
  },
  {
    id: 'weapon-23',
    name: 'Mina Sonora',
    description: 'Uma buzina potente conectada a uma bateria que emite um som ensurdecedor.',
    firepower: 3,
    element: 'sound',
    imagePath: '/upload/Gemini_Generated_Image_ax791yax791yax79.png',
    essentialCard: 'essential-23',
    baseCard: 'base-15',
    basicCard: 'basic-10',
    triggerCard: 'trigger-1',
  },
];

// Get weapon by card combination
export function getWeaponByCards(
  essentialId: string,
  baseId: string,
  basicId: string,
  triggerId: string
): Weapon | undefined {
  return weapons.find(
    (weapon) =>
      weapon.essentialCard === essentialId &&
      weapon.baseCard === baseId &&
      weapon.basicCard === basicId &&
      weapon.triggerCard === triggerId
  );
}

// Get weapon by ID
export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find(weapon => weapon.id === id);
}

// Get element emoji
export function getElementEmoji(element: ElementType): string {
  switch (element) {
    case 'physical':
      return '⚔️';
    case 'fire':
      return '🔥';
    case 'water':
      return '💧';
    case 'electric':
      return '⚡';
    case 'ice':
      return '❄️';
    case 'earth':
      return '🌍';
    case 'sound':
      return '📢';
    default:
      return '❓';
  }
}

// Get element color
export function getElementColor(element: ElementType): string {
  switch (element) {
    case 'physical':
      return '#8B4513';
    case 'fire':
      return '#FF4500';
    case 'water':
      return '#1E90FF';
    case 'electric':
      return '#FFD700';
    case 'ice':
      return '#87CEEB';
    case 'earth':
      return '#8B4513';
    case 'sound':
      return '#9370DB';
    default:
      return '#808080';
  }
}

// Get element name in Portuguese
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
