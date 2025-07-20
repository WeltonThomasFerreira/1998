export interface Game {
  id: string;
  name: string;
  players: string;
  type: string;
  image: string;
  description: string;
  rulesPath: string;
  categories: string[];
  decksUsed: number;
}

export const GAMES_DATA: Game[] = [
  {
    id: 'yaniv',
    name: 'Yaniv',
    players: '2 a 5 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/ADD8E6/000000?text=Yaniv',
    description:
      'Um jogo de cartas rápido e estratégico onde o objetivo é ter a menor pontuação na mão.',
    rulesPath: 'assets/rules/yaniv.md',
    categories: ['Cartas', 'Multiplayer', 'Estratégia'],
    decksUsed: 1,
  },
];
