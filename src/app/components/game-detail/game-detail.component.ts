import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
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
  private readonly route = inject(ActivatedRoute);
  private readonly gameService = inject(GameService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly http = inject(HttpClient);

  public game: WritableSignal<Game | undefined> = signal<Game | undefined>(
    undefined,
  );
  public sanitizedRules: WritableSignal<SafeHtml> = signal<SafeHtml>('');
  public isLoadingRules: WritableSignal<boolean> = signal(true);

  private _routeSubscription: Subscription | undefined;

  public readonly gameNotFoundTitle: string = 'Jogo Não Encontrado';
  public readonly gameNotFoundMessage: string =
    'O jogo que você está procurando não foi encontrado.';
  public readonly loadingRulesMessage: string = 'Carregando regras...';
  public readonly rulesLoadErrorMessage: string =
    'Não foi possível carregar as regras deste jogo.';
  public readonly descriptionSectionTitle: string = 'Descrição';
  public readonly rulesSectionTitle: string = 'Regras do Jogo';
  public readonly backToGamesButtonLabel: string = 'Voltar para Jogos';
  public readonly backToHomeButtonLabel: string = 'Voltar para Início';

  public ngOnInit(): void {
    this._routeSubscription = this.route.paramMap.subscribe((params) => {
      const gameId = params.get('id');
      if (gameId) {
        this.isLoadingRules.set(true);
        const foundGame = this.gameService.getGameById(gameId)();
        this.game.set(foundGame);

        if (foundGame?.rulesPath) {
          this.http
            .get(foundGame.rulesPath, { responseType: 'text' })
            .subscribe({
              next: (markdownContent) => {
                const htmlContent = marked.parse(markdownContent) as string;
                this.sanitizedRules.set(
                  this.sanitizer.bypassSecurityTrustHtml(htmlContent),
                );
                this.isLoadingRules.set(false);
              },
              error: (err) => {
                console.error('Erro ao carregar regras do jogo:', err);
                this.sanitizedRules.set(this.rulesLoadErrorMessage);
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
