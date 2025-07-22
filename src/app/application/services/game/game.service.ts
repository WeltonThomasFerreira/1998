// src/app/application/services/game/game.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Game } from '@domain/models/game.model';
import { MOCK_GAMES } from '@infrastructure/data/mock-games';

/**
 * Serviço de aplicação para gerenciar a lógica de negócio relacionada a jogos.
 * Ele interage com a camada de infraestrutura (MOCK_GAMES neste caso)
 * e fornece dados formatados para a camada de interface.
 *
 * Em um projeto real, este serviço poderia interagir com um GameRepository
 * que, por sua vez, se comunicaria com uma API.
 */
@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  /**
   * Retorna uma lista de jogos em destaque.
   * @returns Observable de um array de Game.
   */
  getFeaturedGames(): Observable<Game[]> {
    const featured = MOCK_GAMES.filter((game: Game) => game.featured);
    return of(featured).pipe(delay(300));
  }

  /**
   * Retorna todos os jogos disponíveis.
   * @returns Observable de um array de Game.
   */
  getAllGames(): Observable<Game[]> {
    return of(MOCK_GAMES).pipe(delay(300));
  }

  /**
   * Retorna um jogo específico pelo seu ID.
   * @param id O ID do jogo a ser buscado.
   * @returns Observable do objeto Game, ou undefined se não encontrado.
   */
  getGameById(id: string): Observable<Game | undefined> {
    const game = MOCK_GAMES.find((g: Game) => g.id === id);
    return of(game).pipe(delay(300));
  }

  /**
   * Retorna uma lista de jogos filtrada por termo de busca e categorias.
   * @param searchTerm Termo para buscar no nome do jogo.
   * @param categoryType Tipo da categoria para filtrar (ex: 'Número de Baralhos').
   * @param categoryValue Valor da categoria para filtrar (ex: '1', '2-4').
   * @returns Observable de um array de Game.
   */
  filterGames(
    searchTerm: string,
    categoryType: string,
    categoryValue: string,
  ): Observable<Game[]> {
    let filtered = MOCK_GAMES;

    if (searchTerm) {
      filtered = filtered.filter((game: Game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryType && categoryValue) {
      filtered = filtered.filter(
        (game: Game) =>
          game.categories && game.categories[categoryType] === categoryValue,
      );
    }

    return of(filtered).pipe(delay(300));
  }
}
