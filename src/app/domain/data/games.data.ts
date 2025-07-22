// src/app/domain/data/games.data.ts

import { Game, GAME_CATEGORIES } from '@domain/models/game.model';

export const GAMES_DATA: Game[] = [
  {
    id: 'yaniv',
    nameKey: 'game_yaniv_name', // Chave para o nome traduzido em app.constants.ts
    descriptionKey: 'game_yaniv_description', // Chave para a descrição traduzida em app.constants.ts
    players: '2 a 5 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/ADD8E6/000000?text=Yaniv',
    rulesPath: 'assets/rules/yaniv.md',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2 a 5 jogadores',
      [GAME_CATEGORIES.TYPE]: 'Cartas',
    },
    featured: true, // Marcado como destaque para este exemplo
  },
  {
    id: 'kings-corners',
    nameKey: 'game_kings_corners_name',
    descriptionKey: 'game_kings_corners_description',
    players: '2 a 4 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/87CEEB/000000?text=Kings+Corners',
    rulesPath: 'assets/rules/kings-corners.md',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2 a 4 jogadores',
      [GAME_CATEGORIES.TYPE]: 'Cartas',
    },
    featured: true,
  },
  {
    id: 'palace',
    nameKey: 'game_palace_name',
    descriptionKey: 'game_palace_description',
    players: '2 a 5 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/FFC0CB/000000?text=Palace',
    rulesPath: 'assets/rules/palace.md',
    categories: {
      [GAME_CATEGORIES.NUMBER_OF_DECKS]: '1',
      [GAME_CATEGORIES.NUMBER_OF_PLAYERS]: '2 a 5 jogadores',
      [GAME_CATEGORIES.TYPE]: 'Cartas',
    },
    featured: true,
  },
  // Adicione outros jogos aqui, seguindo o mesmo padrão
];
