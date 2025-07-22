// src/app/domain/models/game.model.ts

/**
 * Enum para definir as categorias de jogos que podem ser usadas para filtragem.
 * Isso ajuda a padronizar as chaves de categoria e evita erros de digitação.
 */
export enum GAME_CATEGORIES {
  NUMBER_OF_DECKS = 'NUMBER_OF_DECKS', // Usado como chave no objeto de categorias do Game
  NUMBER_OF_PLAYERS = 'NUMBER_OF_PLAYERS', // Usado como chave no objeto de categorias do Game
  TYPE = 'TYPE', // Usado como chave no objeto de categorias do Game
}

/**
 * Interface que define a estrutura de um objeto Game.
 * Esta é a entidade de domínio.
 */
export interface Game {
  id: string;
  // Adicionado index signature para permitir acesso dinâmico por string ('pt' ou 'en')
  name: { pt: string; en: string; [key: string]: string };
  description: { pt: string; en: string; [key: string]: string };
  rulesPath: string; // Apenas o nome do arquivo Markdown (ex: 'yaniv.md')
  translatedRulesPath?: string; // Propriedade opcional para o caminho completo do Markdown traduzido (preenchido pelo GameService)
  image: string; // URL da imagem do jogo
  // Adicionado index signature para permitir acesso dinâmico por string ('pt' ou 'en')
  players: { pt: string; en: string; [key: string]: string };
  type: { pt: string; en: string; [key: string]: string };
  /**
   * Um objeto de categorias para permitir filtragem flexível.
   * As chaves devem corresponder aos valores do enum GAME_CATEGORIES.
   * Ex: { 'NUMBER_OF_DECKS': 'one_deck', 'NUMBER_OF_PLAYERS': 'two_to_four_players' }
   */
  categories: { [key: string]: string }; // As categorias em si ainda podem ser strings
  featured: boolean; // Indica se o jogo deve aparecer na seção de destaque
}
