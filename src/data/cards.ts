// Card types and data for Guerra de Quintal

export type CardType = 'essential' | 'base' | 'basic' | 'trigger';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  description: string;
  emoji: string;
}

// Essential Items (Itens Essenciais) - Unique items for specific weapons
export const essentialCards: Card[] = [
  { id: 'essential-1', name: 'Pistola Nerf', type: 'essential', description: 'Pistola Nerf para montar sentinelas', emoji: '🔫' },
  { id: 'essential-2', name: 'Nerf Vulcan', type: 'essential', description: 'Metralhadora Nerf Vulcan pesada', emoji: '🔫' },
  { id: 'essential-3', name: 'Super Soaker', type: 'essential', description: 'Pistola de água potente', emoji: '💧' },
  { id: 'essential-4', name: 'Soprador', type: 'essential', description: 'Soprador de folhas motorizado', emoji: '🌬️' },
  { id: 'essential-5', name: 'Ratoeira', type: 'essential', description: 'Ratoeira grande de metal', emoji: '🪤' },
  { id: 'essential-6', name: 'Pá', type: 'essential', description: 'Pá de jardim resistente', emoji: '🔨' },
  { id: 'essential-7', name: 'Pote Vidro', type: 'essential', description: 'Pote de vidro grande', emoji: '🏺' },
  { id: 'essential-8', name: 'PVC', type: 'essential', description: 'Tubo de PVC longo', emoji: '🔧' },
  { id: 'essential-9', name: 'Espanador', type: 'essential', description: 'Espanador de penas', emoji: '🪶' },
  { id: 'essential-10', name: 'Barbante', type: 'essential', description: 'Rolo de barbante grosso', emoji: '🧵' },
  { id: 'essential-11', name: 'Mangueira', type: 'essential', description: 'Mangueira de jardim', emoji: '🐍' },
  { id: 'essential-12', name: 'Pulverizador', type: 'essential', description: 'Pulverizador manual', emoji: '💦' },
  { id: 'essential-13', name: 'Roupas', type: 'essential', description: 'Roupas velhas', emoji: '👕' },
  { id: 'essential-14', name: 'Bambolê', type: 'essential', description: 'Bambolê colorido', emoji: '⭕' },
  { id: 'essential-15', name: 'Tapete', type: 'essential', description: 'Tapete velho', emoji: '🟫' },
  { id: 'essential-16', name: 'Aspersor', type: 'essential', description: 'Aspersor de jardim', emoji: '🌧️' },
  { id: 'essential-17', name: 'Pneu', type: 'essential', description: 'Pneu de carro velho', emoji: '⭕' },
  { id: 'essential-18', name: 'Spray', type: 'essential', description: 'Lata de spray', emoji: '🧴' },
  { id: 'essential-19', name: 'Motor', type: 'essential', description: 'Motor elétrico pequeno', emoji: '⚙️' },
  { id: 'essential-20', name: 'Roda Bike', type: 'essential', description: 'Roda de bicicleta', emoji: '🚲' },
  { id: 'essential-21', name: 'Bateria Carro', type: 'essential', description: 'Bateria de carro 12V', emoji: '🔋' },
  { id: 'essential-22', name: 'Extintor', type: 'essential', description: 'Extintor de CO2', emoji: '🧯' },
  { id: 'essential-23', name: 'Buzina', type: 'essential', description: 'Buzina de carro', emoji: '📢' },
];

// Base Items (Bases) - Platforms and supports
export const baseCards: Card[] = [
  { id: 'base-1', name: 'Ventilador', type: 'base', description: 'Ventilador de mesa para base rotativa', emoji: '🌀' },
  { id: 'base-2', name: 'Tripé', type: 'base', description: 'Tripé de câmera ajustável', emoji: '📐' },
  { id: 'base-3', name: 'Carrinho', type: 'base', description: 'Carrinho de brinquedo', emoji: '🛒' },
  { id: 'base-4', name: 'Caixa', type: 'base', description: 'Caixa de papelão grande', emoji: '📦' },
  { id: 'base-5', name: 'Estaca', type: 'base', description: 'Estaca de madeira', emoji: '🪵' },
  { id: 'base-6', name: 'Bloco', type: 'base', description: 'Bloco de concreto', emoji: '🧱' },
  { id: 'base-7', name: 'Galhos', type: 'base', description: 'Galhos de árvore', emoji: '🌿' },
  { id: 'base-8', name: 'Árvore', type: 'base', description: 'Árvore do quintal', emoji: '🌳' },
  { id: 'base-9', name: 'Estacas', type: 'base', description: 'Conjunto de estacas', emoji: '🪵' },
  { id: 'base-10', name: 'Arbusto', type: 'base', description: 'Arbusto do jardim', emoji: '🌲' },
  { id: 'base-11', name: 'Rampa', type: 'base', description: 'Rampa de madeira', emoji: '🚀' },
  { id: 'base-12', name: 'Chapa', type: 'base', description: 'Chapa de metal', emoji: '🔩' },
  { id: 'base-13', name: 'Balde', type: 'base', description: 'Balde plástico', emoji: '🪣' },
  { id: 'base-14', name: 'Galho', type: 'base', description: 'Galho grosso', emoji: '🍃' },
  { id: 'base-15', name: 'Tijolo', type: 'base', description: 'Tijolo vermelho', emoji: '🧱' },
  { id: 'base-16', name: 'Caixote', type: 'base', description: 'Caixote de madeira', emoji: '📦' },
  { id: 'base-17', name: 'Madeirite', type: 'base', description: 'Tábua de madeira', emoji: '🪵' },
  { id: 'base-18', name: 'Fios', type: 'base', description: 'Fios elétricos', emoji: '🔌' },
  { id: 'base-19', name: 'Cadeira', type: 'base', description: 'Cadeira velha', emoji: '🪑' },
  { id: 'base-20', name: 'Corda', type: 'base', description: 'Corda de náilon', emoji: '🪢' },
];

// Basic Items (Itens Básicos) - Common materials
export const basicCards: Card[] = [
  { id: 'basic-1', name: 'Básico', type: 'basic', description: 'Material básico genérico', emoji: '⚙️' },
  { id: 'basic-2', name: 'Maçarico', type: 'basic', description: 'Maçarico portátil', emoji: '🔥' },
  { id: 'basic-3', name: 'Cola', type: 'basic', description: 'Cola resistente', emoji: '🧴' },
  { id: 'basic-4', name: 'Geleca', type: 'basic', description: 'Gelatina pegajosa', emoji: '🍬' },
  { id: 'basic-5', name: 'Gude', type: 'basic', description: 'Bolas de gude', emoji: '🔵' },
  { id: 'basic-6', name: 'Água', type: 'basic', description: 'Água do jardim', emoji: '💧' },
  { id: 'basic-7', name: 'Pimenta', type: 'basic', description: 'Pimenta malagueta', emoji: '🌶️' },
  { id: 'basic-8', name: 'Fogo', type: 'basic', description: 'Elemento fogo', emoji: '🔥' },
  { id: 'basic-9', name: 'Carvão', type: 'basic', description: 'Carvão vegetal', emoji: '⬛' },
  { id: 'basic-10', name: 'Lama', type: 'basic', description: 'Lama do quintal', emoji: '🟤' },
  { id: 'basic-11', name: 'Lápis', type: 'basic', description: 'Lápis afiados', emoji: '✏️' },
  { id: 'basic-12', name: 'Tênis', type: 'basic', description: 'Tênis velho', emoji: '👟' },
];

// Trigger Items (Gatilhos) - Activation mechanisms
export const triggerCards: Card[] = [
  { id: 'trigger-1', name: 'Gatilho', type: 'trigger', description: 'Mecanismo de ativação simples', emoji: '⚡' },
  { id: 'trigger-2', name: 'Sensor', type: 'trigger', description: 'Sensor de movimento', emoji: '📡' },
  { id: 'trigger-3', name: 'Timer', type: 'trigger', description: 'Timer programável', emoji: '⏰' },
  { id: 'trigger-4', name: 'Corda', type: 'trigger', description: 'Ativação por corda', emoji: '🪢' },
  { id: 'trigger-5', name: 'Pedal', type: 'trigger', description: 'Ativação por pedal', emoji: '🦶' },
  { id: 'trigger-6', name: 'Pressão', type: 'trigger', description: 'Sensor de pressão', emoji: '⬇️' },
];

// All cards combined
export const allCards: Card[] = [
  ...essentialCards,
  ...baseCards,
  ...basicCards,
  ...triggerCards,
];

// Get cards by type
export function getCardsByType(type: CardType): Card[] {
  switch (type) {
    case 'essential':
      return essentialCards;
    case 'base':
      return baseCards;
    case 'basic':
      return basicCards;
    case 'trigger':
      return triggerCards;
    default:
      return [];
  }
}

// Get card by ID
export function getCardById(id: string): Card | undefined {
  return allCards.find(card => card.id === id);
}
