# 🏠 Guerra de Quintal: Mestres da Sucata

> Um protótipo digital do jogo de tabuleiro cooperativo onde crianças defendem seu quintal de criaturas do folclore brasileiro usando armas feitas de sucata!

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

**🎮 [JOGAR AGORA](https://nelsonvieiramartins.github.io/guerra-de-quintal/)**

---

## 🎮 Funcionalidades

### 🔧 Calculadora de Crafting
- Combine 4 tipos de cartas para criar armas:
  - **Item Essencial** - O componente principal
  - **Base** - Suporte ou estrutura
  - **Item Básico** - Material ou elemento
  - **Gatilho** - Mecanismo de ativação
- 23 receitas de armas únicas
- Visual estilo papel envelhecido

### ⚔️ Simulador de Combate
- Sistema de dados d6
- **4-6 = Acerto** (causa 1 de dano)
- **1-3 = Erro** (não causa dano)
- Sistema de fraqueza elemental (+1 dado)
- Sistema de resistência elemental (-1 sucesso)
- 6 monstros do folclore brasileiro

### 🎮 Mini Jogo
- 3 caminhos de invasão (Esquerdo, Central, Direito)
- 3 cômodos da casa (Quarto, Cozinha, Sala)
- Posicione armas estrategicamente
- Defenda contra ondas de monstros aleatórios

---

## 👹 Monstros

| Monstro | HP | Fraqueza | Resistência |
|---------|-----|----------|-------------|
| 🌀 Saci | 3 | Armadilhas de Chão | Físico |
| 🐴 Mula Sem Cabeça | 5 | Água/Som/Lama | Fogo (imune) |
| 🐕 Capelobo | 4 | Eletricidade/Perfuração | Físico Leve |
| 🌲 Curupira | 3 | Armadilhas Manuais | Sensores |
| 🔥 Boitatá | 4 | Gelo | Fogo/Sensores |
| 🧙‍♀️ Cuca (Boss) | 10 | Dano Combinado | Tudo Isolado |

---

## 📜 Regras do Jogo

### Sistema de Combate
1. Role dados d6 igual ao poder de fogo da arma
2. Cada resultado 4, 5 ou 6 é um acerto
3. Cada acerto causa 1 de dano
4. Fraqueza elemental: +1 dado extra
5. Resistência elemental: -1 sucesso

### Mini Jogo
1. Posicione 3-6 armas nos caminhos (máx. 2 por caminho)
2. Monstros aparecem aleatoriamente em um dos 3 caminhos
3. Armas atacam monstros na mesma zona
4. Monstros avançam uma zona por turno
5. Se 3 monstros chegarem à casa, você perde!
6. Sobreviva 10 turnos para vencer!

---

## 💻 Desenvolvimento Local

```bash
# Clonar o repositório
git clone https://github.com/nelsonvieiramartins/guerra-de-quintal.git
cd guerra-de-quintal

# Instalar dependências
bun install

# Rodar em desenvolvimento
bun run dev

# Acesse http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Página principal
│   │   ├── layout.tsx        # Layout global
│   │   └── globals.css       # Estilos (papel envelhecido)
│   ├── components/
│   │   ├── game/
│   │   │   ├── CraftingCalculator.tsx
│   │   │   ├── CombatSimulator.tsx
│   │   │   └── MiniGame.tsx
│   │   └── ui/               # Componentes shadcn/ui
│   ├── data/
│   │   ├── cards.ts          # 56 cartas do jogo
│   │   ├── monsters.ts       # 6 monstros
│   │   └── recipes.ts        # 23 receitas de armas
│   └── lib/
│       └── gameLogic.ts      # Lógica do jogo
├── public/
│   └── upload/               # Imagens das armas
└── .github/
    └── workflows/
        └── deploy.yml        # Deploy automático
```

---

## 🎨 Visual

O jogo usa uma estética de **papel envelhecido** inspirada em artesanato brasileiro:
- Tons terrosos (marrom, bege, ocre)
- Textura de papel antigo
- Bordas rasgadas
- Estilo handmade/desenhado à mão

---

## 📖 Créditos

Baseado no Game Design Document de "Guerra de Quintal: Mestres da Sucata"

---

🎲 **Jogue e defenda seu quintal das criaturas do folclore!**
