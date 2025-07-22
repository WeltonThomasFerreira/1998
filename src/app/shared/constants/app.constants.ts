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
  // Adicione outras chaves de tradução conforme necessário
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
    appName: 'Baralho de Jogos',
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
    developerName2: 'Gemini',
    versionInfo: 'Versão 1.0.0',
    backToHome: 'Voltar para o Início',
    closeMenu: 'Fechar menu', // Para acessibilidade
    openMenu: 'Abrir menu', // Para acessibilidade
    theme: 'Tema',
    language: 'Idioma',
    homeBreadcrumb: 'Início',
    gamesBreadcrumb: 'Jogos',
    aboutBreadcrumb: 'Sobre',
    // Categorias de jogos (para exibição no filtro)
    NUMBER_OF_DECKS: 'Número de Baralhos',
    NUMBER_OF_PLAYERS: 'Número de Jogadores',
    TYPE: 'Tipo de Jogo',
    // Valores de categoria (se precisar de tradução específica para eles)
    '1': '1 Baralho',
    '2': '2 Baralhos',
    '6-8': '6-8 Baralhos',
    '1 jogador': '1 Jogador',
    '2 a 4 jogadores': '2-4 Jogadores',
    '2, 4 ou 6 jogadores': '2, 4 ou 6 Jogadores',
    '2 a 10 jogadores': '2-10 Jogadores',
    '1+ jogadores': '1+ Jogadores',
    '4 jogadores': '4 Jogadores',
    '2 a 6 jogadores': '2-6 Jogadores',
    '2 a 8 jogadores': '2-8 Jogadores',
    Paciência: 'Paciência',
    Truco: 'Truco',
    Estratégia: 'Estratégia',
    Cassino: 'Cassino',
    Vazas: 'Vazas',
    Descarte: 'Descarte',
    'Trinca/Sequência': 'Trinca/Sequência',
  },
  en: {
    appName: 'Card Games Hub',
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
    developerName2: 'Gemini',
    versionInfo: 'Version 1.0.0',
    backToHome: 'Back to Home',
    closeMenu: 'Close menu', // For accessibility
    openMenu: 'Open menu', // For accessibility
    theme: 'Theme',
    language: 'Language',
    homeBreadcrumb: 'Home',
    gamesBreadcrumb: 'Games',
    aboutBreadcrumb: 'About',
    // Game categories (for filter display)
    NUMBER_OF_DECKS: 'Number of Decks',
    NUMBER_OF_PLAYERS: 'Number of Players',
    TYPE: 'Game Type',
    // Category values (if specific translation needed for them)
    '1': '1 Deck',
    '2': '2 Decks',
    '6-8': '6-8 Decks',
    '1 jogador': '1 Player',
    '2 a 4 jogadores': '2-4 Players',
    '2, 4 ou 6 jogadores': '2, 4 or 6 Players',
    '2 a 10 jogadores': '2-10 Players',
    '1+ jogadores': '1+ Players',
    '4 jogadores': '4 Players',
    '2 a 6 jogadores': '2-6 Players',
    '2 a 8 jogadores': '2-8 Players',
    Paciência: 'Solitaire',
    Truco: 'Truco',
    Estratégia: 'Strategy',
    Cassino: 'Casino',
    Vazas: 'Trick-taking',
    Descarte: 'Discarding',
    'Trinca/Sequência': 'Rummy-like',
  },
};
