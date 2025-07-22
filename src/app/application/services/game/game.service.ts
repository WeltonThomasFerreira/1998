// src/app/application/services/game/game.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop'; // Importar toObservable para sinais

import { Game } from '@domain/models/game.model';
import { GAMES_DATA } from '@domain/data/games.data';
import { LanguageService } from '@application/services/language/language.service';
import { TranslationContent } from '@shared/constants/app.constants';

/**
 * Serviço de aplicação para gerenciar os dados dos jogos.
 * Ele fornece métodos para obter jogos em destaque, todos os jogos e um jogo por ID,
 * garantindo que os nomes e descrições sejam traduzidos dinamicamente.
 */
@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Converte o sinal de traduções em um Observable para reatividade
  private translations$: Observable<TranslationContent>;

  constructor(private languageService: LanguageService) {
    // Converte o sinal de traduções do LanguageService em um Observable.
    // Isso permite que o GameService reaja às mudanças de idioma.
    this.translations$ = toObservable(this.languageService.translations);
  }

  /**
   * Retorna todos os jogos, com os nomes e descrições traduzidos para o idioma atual.
   * Este Observable emitirá novos valores sempre que o idioma mudar.
   * @returns Um Observable de um array de objetos Game.
   */
  getAllGames(): Observable<Game[]> {
    return this.translations$.pipe(
      map((currentTranslations) => {
        // Mapeia os dados brutos dos jogos para incluir nomes e descrições traduzidos
        return GAMES_DATA.map((game) =>
          this.mapGameWithTranslations(game, currentTranslations),
        );
      }),
    );
  }

  /**
   * Retorna os jogos em destaque, com os nomes e descrições traduzidos para o idioma atual.
   * Este Observable emitirá novos valores sempre que o idioma mudar.
   * @returns Um Observable de um array de objetos Game.
   */
  getFeaturedGames(): Observable<Game[]> {
    return this.translations$.pipe(
      map((currentTranslations) => {
        const featured = GAMES_DATA.filter((game) => game.featured);
        return featured.map((game) =>
          this.mapGameWithTranslations(game, currentTranslations),
        );
      }),
    );
  }

  /**
   * Retorna um jogo específico por ID, com o nome e a descrição traduzidos.
   * Este Observable emitirá um novo valor sempre que o idioma mudar.
   * @param id O ID do jogo.
   * @returns Um Observable do objeto Game, ou undefined se não encontrado.
   */
  getGameById(id: string): Observable<Game | undefined> {
    return this.translations$.pipe(
      map((currentTranslations) => {
        const game = GAMES_DATA.find((g) => g.id === id);
        if (game) {
          return this.mapGameWithTranslations(game, currentTranslations);
        }
        return undefined;
      }),
    );
  }

  /**
   * Mapeia um objeto Game para incluir as propriedades 'name' e 'description'
   * com base nas chaves de tradução e no objeto de traduções atual.
   * @param game O objeto Game original.
   * @param translations O objeto de traduções para o idioma atual.
   * @returns O objeto Game com nome e descrição traduzidos.
   */
  private mapGameWithTranslations(
    game: Game,
    translations: TranslationContent,
  ): Game {
    return {
      ...game,
      // Acessa as traduções usando as chaves dinamicamente
      name: translations[game.nameKey] || game.nameKey, // Fallback para a chave se a tradução não for encontrada
      description: translations[game.descriptionKey] || game.descriptionKey, // Fallback para a chave
    };
  }
}
