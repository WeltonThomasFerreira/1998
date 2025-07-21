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
  {
    id: 'kings-corners',
    name: 'Kings Corners',
    players: '2 a 4 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/87CEEB/000000?text=Kings+Corners',
    description:
      'Um jogo de cartas onde o objetivo é ser o primeiro a descartar todas as suas cartas, utilizando pilhas de descarte em formação de cruz e cantos para Reis.',
    rulesPath: 'assets/rules/kings-corners.md',
    categories: ['Cartas', 'Estratégia', 'Paciência'],
    decksUsed: 1,
  },
  {
    id: 'palace',
    name: 'Palace',
    players: '2 a 5 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/FFC0CB/000000?text=Palace',
    description:
      'Um jogo de cartas onde o objetivo é ser o primeiro a se livrar de todas as suas cartas, utilizando um "palácio" de cartas na mesa e cartas especiais para queimar a pilha.',
    rulesPath: 'assets/rules/palace.md',
    categories: ['Cartas', 'Estratégia', 'Habilidade'],
    decksUsed: 1,
  },
];
