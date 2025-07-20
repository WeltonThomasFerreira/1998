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
    id: 'paciencia',
    name: 'Paciência (Klondike)',
    players: '1 jogador',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/ADD8E6/000000?text=Paciencia',
    description:
      'O clássico jogo de cartas para um jogador, perfeito para passar o tempo.',
    rulesPath: 'assets/rules/paciencia.md',
    categories: ['Cartas', 'Solo', 'Clássico'],
    decksUsed: 1,
  },
  {
    id: 'truco',
    name: 'Truco Paulista',
    players: '2 ou 4 jogadores',
    type: 'Cartas',
    image: 'https://placehold.co/400x200/ADD8E6/000000?text=Truco',
    description:
      'Um emocionante jogo de cartas brasileiro que envolve blefe e estratégia.',
    rulesPath: 'assets/rules/truco.md',
    categories: ['Cartas', 'Multiplayer', 'Estratégia', 'Blefe', 'Brasileiro'],
    decksUsed: 1,
  },
];
