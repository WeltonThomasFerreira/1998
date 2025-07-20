import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../data/games.data';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss',
})
export class GameDetailComponent implements OnInit, OnDestroy {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _gameService: GameService = inject(GameService);
  private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly _http: HttpClient = inject(HttpClient);

  public game: WritableSignal<Game | undefined> = signal<Game | undefined>(
    undefined,
  );
  public sanitizedRules: WritableSignal<SafeHtml> = signal<SafeHtml>('');
  public isLoadingRules: WritableSignal<boolean> = signal(true);

  private _routeSubscription: Subscription | undefined;

  private readonly _gameNotFoundTitle: string = 'Jogo Não Encontrado';
  private readonly _gameNotFoundMessage: string =
    'O jogo que você está procurando não foi encontrado.';
  private readonly _loadingRulesMessage: string = 'Carregando regras...';
  private readonly _rulesLoadErrorMessage: string =
    'Não foi possível carregar as regras deste jogo.';

  public get gameNotFoundTitle(): string {
    return this._gameNotFoundTitle;
  }

  public get gameNotFoundMessage(): string {
    return this._gameNotFoundMessage;
  }

  public get loadingRulesMessage(): string {
    return this._loadingRulesMessage;
  }

  public get rulesLoadErrorMessage(): string {
    return this._rulesLoadErrorMessage;
  }

  public ngOnInit(): void {
    this._routeSubscription = this._route.paramMap.subscribe((params) => {
      const gameId: string | null = params.get('id');
      if (gameId) {
        this.isLoadingRules.set(true);
        const foundGame: Game | undefined =
          this._gameService.getGameById(gameId)();
        this.game.set(foundGame);

        if (foundGame && foundGame.rulesPath) {
          this._http
            .get(foundGame.rulesPath, { responseType: 'text' })
            .subscribe({
              next: (markdownContent: string) => {
                const htmlContent: string = marked.parse(
                  markdownContent,
                ) as string;
                this.sanitizedRules.set(
                  this._sanitizer.bypassSecurityTrustHtml(htmlContent),
                );
                this.isLoadingRules.set(false);
              },
              error: (err: unknown) => {
                console.error('Erro ao carregar regras do jogo:', err);
                this.sanitizedRules.set(this._rulesLoadErrorMessage);
                this.isLoadingRules.set(false);
              },
            });
        } else {
          this.sanitizedRules.set('');
          this.isLoadingRules.set(false);
        }
      } else {
        this.isLoadingRules.set(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this._routeSubscription?.unsubscribe();
  }
}
