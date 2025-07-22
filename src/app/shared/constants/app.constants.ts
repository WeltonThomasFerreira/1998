// src/app/shared/constants/app.constants.ts

/**
 * Interface para o conteúdo de tradução de um único idioma.
 * Usa um index signature para permitir acesso dinâmico às propriedades.
 */
export interface TranslationContent {
  [key: string]: string; // Permite que qualquer string seja usada como chave, retornando uma string
  appName: string;
  home: string;
  games: string;
  about: string;
  featuredGames: string;
  showAllGames: string;
  viewDetails: string;
  viewDetailsFor: string;
  previousGame: string;
  nextGame: string;
  noFeaturedGames: string;
  allGames: string;
  searchByName: string;
  filterByCategory: string;
  selectCategory: string;
  allCategories: string;
  filterByValue: string;
  selectCategoryValue: string;
  allValues: string;
  noGamesFound: string;
  loadMore: string;
  gameNotFound: string;
  howToPlay: string;
  backToList: string;
  aboutProject: string;
  aboutDescription: string;
  projectGoal: string;
  developers: string;
  developerName1: string;
  developerName2: string;
  versionInfo: string;
  backToHome: string;
  closeMenu: string;
  openMenu: string;
  theme: string;
  language: string;
  homeBreadcrumb: string;
  gamesBreadcrumb: string;
  aboutBreadcrumb: string;
  scrollToTop: string; // Nova chave de tradução
  // Categorias de jogos (para exibição no filtro)
  NUMBER_OF_DECKS: string;
  NUMBER_OF_PLAYERS: string;
  TYPE: string;
  // Novas chaves em inglês para os valores de categoria
  one_deck: string;
  two_decks: string;
  six_to_eight_decks: string;
  one_player: string;
  two_to_four_players: string;
  two_four_or_six_players: string;
  two_to_ten_players: string;
  one_plus_players: string;
  four_players: string;
  two_to_six_players: string;
  two_to_eight_players: string;
  solitaire_type: string;
  truco_type: string;
  strategy_type: string;
  casino_type: string;
  trick_taking_type: string;
  shedding_type: string;
  rummy_like_type: string;
  // Adicionando chaves que faltam para os valores de categoria que podem estar em games.data.ts
  two_to_five_players: string;
  two_to_seven_players: string;
  cards_type: string; // Tipo genérico para jogos de cartas
}

/**
 * Interface para o objeto TRANSLATIONS completo.
 * Permite indexar por 'pt' ou 'en' para obter o TranslationContent.
 */
export interface Translations {
  [key: string]: TranslationContent; // Permite que 'pt' ou 'en' sejam usadas como chaves
  pt: TranslationContent;
  en: TranslationContent;
}

/**
 * Objeto que contém todas as traduções da aplicação.
 * As chaves são os códigos de idioma (ex: 'pt', 'en').
 * Cada valor é um objeto com as chaves de tradução para aquele idioma.
 */
export const TRANSLATIONS: Translations = {
  pt: {
    appName: '1998',
    home: 'Início',
    games: 'Jogos',
    about: 'Sobre',
    featuredGames: 'Jogos em Destaque',
    showAllGames: 'Ver Todos os Jogos',
    viewDetails: 'Ver Detalhes',
    viewDetailsFor: 'Ver detalhes para', // Para acessibilidade
    previousGame: 'Jogo anterior', // Para acessibilidade
    nextGame: 'Próximo jogo', // Para acessibilidade
    noFeaturedGames: 'Nenhum jogo em destaque encontrado.',
    allGames: 'Todos os Jogos',
    searchByName: 'Buscar por nome...',
    filterByCategory: 'Filtrar por Categoria',
    selectCategory: 'Selecione uma categoria',
    allCategories: 'Todas as Categorias',
    filterByValue: 'Filtrar por Valor',
    selectCategoryValue: 'Selecione um valor',
    allValues: 'Todos os Valores',
    noGamesFound: 'Nenhum jogo encontrado com os filtros aplicados.',
    loadMore: 'Carregar Mais',
    gameNotFound: 'Jogo não encontrado.',
    howToPlay: 'Como Jogar',
    backToList: 'Voltar para a Lista de Jogos',
    aboutProject: 'Sobre o Projeto',
    aboutDescription:
      'Este projeto é uma aplicação web para explorar e aprender sobre diversos jogos de baralho.',
    projectGoal:
      'O objetivo é fornecer uma plataforma amigável com informações detalhadas sobre regras, número de jogadores e categorias de jogos.',
    developers: 'Desenvolvedores',
    developerName1: 'Thomas',
    developerName2: 'Laís',
    versionInfo: 'Versão 1.0.0',
    backToHome: 'Voltar para o Início',
    closeMenu: 'Fechar menu', // Para acessibilidade
    openMenu: 'Abrir menu', // Para acessibilidade
    theme: 'Tema',
    language: 'Idioma',
    homeBreadcrumb: 'Início',
    gamesBreadcrumb: 'Jogos',
    aboutBreadcrumb: 'Sobre',
    scrollToTop: 'Rolar para o Topo', // Nova tradução
    // Categorias de jogos (para exibição no filtro)
    NUMBER_OF_DECKS: 'Número de Baralhos',
    NUMBER_OF_PLAYERS: 'Número de Jogadores',
    TYPE: 'Tipo de Jogo',
    // Valores de categoria (agora usando chaves em inglês)
    one_deck: '1 Baralho',
    two_decks: '2 Baralhos',
    six_to_eight_decks: '6-8 Baralhos',
    one_player: '1 Jogador',
    two_to_four_players: '2-4 Jogadores',
    two_four_or_six_players: '2, 4 ou 6 Jogadores',
    two_to_ten_players: '2-10 Jogadores',
    one_plus_players: '1+ Jogadores',
    four_players: '4 Jogadores',
    two_to_six_players: '2-6 Jogadores',
    two_to_eight_players: '2-8 Jogadores',
    solitaire_type: 'Paciência',
    truco_type: 'Truco',
    strategy_type: 'Estratégia',
    casino_type: 'Cassino',
    trick_taking_type: 'Vazas',
    shedding_type: 'Descarte',
    rummy_like_type: 'Trinca/Sequência',
    two_to_five_players: '2-5 Jogadores', // Adicionado
    two_to_seven_players: '2-7 Jogadores', // Adicionado
    cards_type: 'Cartas', // Adicionado
  },
  en: {
    appName: '1998',
    home: 'Home',
    games: 'Games',
    about: 'About',
    featuredGames: 'Featured Games',
    showAllGames: 'View All Games',
    viewDetails: 'View Details',
    viewDetailsFor: 'View details for', // For accessibility
    previousGame: 'Previous game', // For accessibility
    nextGame: 'Next game', // For accessibility
    noFeaturedGames: 'No featured games found.',
    allGames: 'All Games',
    searchByName: 'Search by name...',
    filterByCategory: 'Filter by Category',
    selectCategory: 'Select a category',
    allCategories: 'All Categories',
    filterByValue: 'Filter by Value',
    selectCategoryValue: 'Select a value',
    allValues: 'All Values',
    noGamesFound: 'No games found with the applied filters.',
    loadMore: 'Load More',
    gameNotFound: 'Game not found.',
    howToPlay: 'How to Play',
    backToList: 'Back to Games List',
    aboutProject: 'About the Project',
    aboutDescription:
      'This project is a web application to explore and learn about various card games.',
    projectGoal:
      'The goal is to provide a user-friendly platform with detailed information on rules, number of players, and game categories.',
    developers: 'Developers',
    developerName1: 'Thomas',
    developerName2: 'Laís',
    versionInfo: 'Version 1.0.0',
    backToHome: 'Back to Home',
    closeMenu: 'Close menu', // For accessibility
    openMenu: 'Open menu', // For accessibility
    theme: 'Theme',
    language: 'Language',
    homeBreadcrumb: 'Home',
    gamesBreadcrumb: 'Games',
    aboutBreadcrumb: 'About',
    scrollToTop: 'Scroll to Top', // Nova tradução
    // Game categories (for filter display)
    NUMBER_OF_DECKS: 'Number of Decks',
    NUMBER_OF_PLAYERS: 'Number of Players',
    TYPE: 'Game Type',
    // Valores de categoria (agora usando chaves em inglês)
    one_deck: '1 Deck',
    two_decks: '2 Decks',
    six_to_eight_decks: '6-8 Decks',
    one_player: '1 Player',
    two_to_four_players: '2-4 Players',
    two_four_or_six_players: '2, 4 or 6 Players',
    two_to_ten_players: '2-10 Players',
    one_plus_players: '1+ Players',
    four_players: '4 Players',
    two_to_six_players: '2-6 Players',
    two_to_eight_players: '2-8 Players',
    solitaire_type: 'Solitaire',
    truco_type: 'Truco',
    strategy_type: 'Strategy',
    casino_type: 'Casino',
    trick_taking_type: 'Trick-taking',
    shedding_type: 'Shedding',
    rummy_like_type: 'Rummy-like',
    two_to_five_players: '2-5 Players', // Adicionado
    two_to_seven_players: '2-7 Players', // Adicionado
    cards_type: 'Cards', // Adicionado
  },
};
