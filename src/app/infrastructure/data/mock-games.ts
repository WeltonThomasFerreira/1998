// src/app/infrastructure/data/mock-games.ts

import { Game, GAME_CATEGORIES } from '@domain/models/game.model';

/**
 * Dados mockados de jogos de baralho.
 * Em um cenário real, estes dados viriam de uma API ou banco de dados.
 * A estrutura 'categories' foi ajustada para um objeto para permitir filtragem por tipo de categoria.
 */
export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    name: 'Paciência (Klondike)',
    description: 'Um clássico jogo de paciência para um jogador.',
    rulesPath: 'assets/rules/paciencia-klondike.md', // Exemplo de caminho para o Markdown
    image: 'https://placehold.co/400x200/ADD8E6/000000?text=Paciencia', // Placeholder
    players: '1 jogador',
    type: 'Paciência',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '1',
      [GAME_CATEGORIES.TYPE]: 'Paciência',
    },
    featured: true,
  },
  {
    id: '2',
    name: 'Buraco',
    description: 'Um jogo de baralho popular para 2 ou 4 jogadores.',
    rulesPath: 'assets/rules/buraco.md',
    image: 'https://placehold.co/400x200/87CEEB/000000?text=Buraco',
    players: '2 a 4 jogadores',
    type: 'Truco', // Tipo mais genérico para o jogo
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '2',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-4',
      [GAME_CATEGORIES.TYPE]: 'Truco',
    },
    featured: true,
  },
  {
    id: '3',
    name: 'Truco',
    description: 'Um jogo de baralho de cartas para 2, 4 ou 6 jogadores.',
    rulesPath: 'assets/rules/truco.md',
    image: 'https://placehold.co/400x200/FFC0CB/000000?text=Truco',
    players: '2, 4 ou 6 jogadores',
    type: 'Truco',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-6',
      [GAME_CATEGORIES.TYPE]: 'Truco',
    },
    featured: false,
  },
  {
    id: '4',
    name: "Poker (Texas Hold'em)",
    description: 'O jogo de poker mais popular do mundo.',
    rulesPath: 'assets/rules/poker-texas-holdem.md',
    image: 'https://placehold.co/400x200/DDA0DD/000000?text=Poker',
    players: '2 a 10 jogadores',
    type: 'Estratégia',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-10',
      [GAME_CATEGORIES.TYPE]: 'Estratégia',
    },
    featured: true,
  },
  {
    id: '5',
    name: 'Blackjack (21)',
    description:
      'O objetivo é ter uma mão com valor mais próximo de 21 do que o dealer, sem ultrapassar.',
    rulesPath: 'assets/rules/blackjack.md',
    image: 'https://placehold.co/400x200/90EE90/000000?text=Blackjack',
    players: '1+ jogadores',
    type: 'Cassino',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '6-8',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '1+',
      [GAME_CATEGORIES.TYPE]: 'Cassino',
    },
    featured: true,
  },
  {
    id: '6',
    name: 'Bridge',
    description:
      'Um jogo de vazas complexo para quatro jogadores em duas parcerias.',
    rulesPath: 'assets/rules/bridge.md',
    image: 'https://placehold.co/400x200/FFD700/000000?text=Bridge',
    players: '4 jogadores',
    type: 'Estratégia',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '4',
      [GAME_CATEGORIES.TYPE]: 'Estratégia',
    },
    featured: false,
  },
  {
    id: '7',
    name: 'Copa',
    description: 'Um jogo de vazas onde o objetivo é evitar certas cartas.',
    rulesPath: 'assets/rules/copa.md',
    image: 'https://placehold.co/400x200/F08080/000000?text=Copa',
    players: '4 jogadores',
    type: 'Vazas',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '4',
      [GAME_CATEGORIES.TYPE]: 'Vazas',
    },
    featured: false,
  },
  {
    id: '8',
    name: 'Can Can',
    description:
      'Um jogo de descarte rápido onde o objetivo é ser o primeiro a se livrar de todas as cartas.',
    rulesPath: 'assets/rules/can-can.md',
    image: 'https://placehold.co/400x200/87CEFA/000000?text=Can+Can',
    players: '2 a 6 jogadores',
    type: 'Descarte',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-6',
      [GAME_CATEGORIES.TYPE]: 'Descarte',
    },
    featured: false,
  },
  {
    id: '9',
    name: 'Pife',
    description: 'Um jogo de formar trincas e sequências para bater.',
    rulesPath: 'assets/rules/pife.md',
    image: 'https://placehold.co/400x200/DA70D6/000000?text=Pife',
    players: '2 a 8 jogadores',
    type: 'Trinca/Sequência',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1-2',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-8',
      [GAME_CATEGORIES.TYPE]: 'Trinca/Sequência',
    },
    featured: false,
  },
  {
    id: '10',
    name: 'Caxeta',
    description:
      'Similar ao Pife, mas com regras específicas para "bater" e "comprar".',
    rulesPath: 'assets/rules/caxeta.md',
    image: 'https://placehold.co/400x200/BA55D3/000000?text=Caxeta',
    players: '2 a 6 jogadores',
    type: 'Trinca/Sequência',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '2',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2-6',
      [GAME_CATEGORIES.TYPE]: 'Trinca/Sequência',
    },
    featured: false,
  },
];
