// src/app/application/services/game/game.service.ts

import { Injectable, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

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
  private translations$: Observable<TranslationContent>;
  private currentLanguage: string;

  constructor(private languageService: LanguageService) {
    this.translations$ = toObservable(this.languageService.translations);
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
      console.log('GameService: Current language updated to:', lang); // Log para depuração
    });
    this.currentLanguage = this.languageService.currentLanguage;
  }

  /**
   * Retorna todos os jogos, com o caminho correto para as regras em Markdown.
   * Os nomes e descrições, e agora também players e type, já estão no objeto Game para cada idioma.
   * @returns Um Observable de um array de objetos Game.
   */
  getAllGames(): Observable<Game[]> {
    return this.translations$.pipe(
      map(() => {
        console.log(
          'GameService: getAllGames - mapping data for language:',
          this.currentLanguage,
        ); // Log para depuração
        return GAMES_DATA.map((game) =>
          this.addTranslatedRulesPath(game, this.currentLanguage),
        );
      }),
    );
  }

  /**
   * Retorna os jogos em destaque, com o caminho correto para as regras em Markdown.
   * Os nomes e descrições, e agora também players e type, já estão no objeto Game para cada idioma.
   * @returns Um Observable de um array de objetos Game.
   */
  getFeaturedGames(): Observable<Game[]> {
    return this.translations$.pipe(
      map(() => {
        console.log(
          'GameService: getFeaturedGames - mapping data for language:',
          this.currentLanguage,
        ); // Log para depuração
        const featured = GAMES_DATA.filter((game) => game.featured);
        return featured.map((game) =>
          this.addTranslatedRulesPath(game, this.currentLanguage),
        );
      }),
    );
  }

  /**
   * Retorna um jogo específico por ID, com o caminho correto para as regras em Markdown.
   * Os nomes e descrições, e agora também players e type, já estão no objeto Game para cada idioma.
   * @param id O ID do jogo.
   * @returns Um Observable do objeto Game, ou undefined se não encontrado.
   */
  getGameById(id: string): Observable<Game | undefined> {
    return this.translations$.pipe(
      map(() => {
        console.log(
          'GameService: getGameById - mapping data for language:',
          this.currentLanguage,
        ); // Log para depuração
        const game = GAMES_DATA.find((g) => g.id === id);
        if (game) {
          return this.addTranslatedRulesPath(game, this.currentLanguage);
        }
        return undefined;
      }),
    );
  }

  /**
   * Adiciona a propriedade 'translatedRulesPath' ao objeto Game
   * com base no idioma atual.
   * @param game O objeto Game original.
   * @param currentLanguage O idioma atual ('pt' ou 'en').
   * @returns O objeto Game com o caminho de regras traduzido.
   */
  private addTranslatedRulesPath(game: Game, currentLanguage: string): Game {
    return {
      ...game,
      translatedRulesPath: `assets/rules/${currentLanguage}/${game.rulesPath}`,
    };
  }
}
