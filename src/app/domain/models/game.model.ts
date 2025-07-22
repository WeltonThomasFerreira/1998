// src/app/domain/models/game.model.ts

/**
 * Enum para definir as categorias de jogos que podem ser usadas para filtragem.
 * Isso ajuda a padronizar as chaves de categoria e evita erros de digitação.
 */
export enum GAME_CATEGORIES {
  NUMBER_OF_DECKS = 'decksUsed', // Usado como chave no objeto de categorias do Game
  NUMBER_OF_PLAYERS = 'players', // Usado como chave no objeto de categorias do Game
  TYPE = 'type', // Usado como chave no objeto de categorias do Game
}

/**
 * Interface que define a estrutura de um objeto Game.
 * Esta é a entidade de domínio.
 */
export interface Game {
  id: string;
  nameKey: string; // Chave para o nome traduzido do jogo (ex: 'game_yaniv_name')
  descriptionKey: string; // Chave para a descrição traduzida do jogo (ex: 'game_yaniv_description')
  // Adicionadas as propriedades 'name' e 'description' como opcionais
  // Elas serão preenchidas pelo GameService após a tradução.
  name?: string;
  description?: string;
  rulesPath: string; // Caminho para o arquivo Markdown das regras
  image: string; // URL da imagem do jogo
  players: string; // Ex: "2 a 5 jogadores", "1 jogador" - Estes ainda podem ser traduzidos via categories
  type: string; // Ex: "Cartas", "Tabuleiro", "Paciência" - Estes ainda podem ser traduzidos via categories
  /**
   * Um objeto de categorias para permitir filtragem flexível.
   * As chaves devem corresponder aos valores do enum GAME_CATEGORIES.
   * Ex: { 'decksUsed': '1', 'players': '2-4' }
   */
  categories: { [key: string]: string };
  featured: boolean; // Indica se o jogo deve aparecer na seção de destaque
}
