// src/app/interface/pages/game-detail/game-detail-page.component.ts

import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';

import { Game } from '@domain/models/game.model';
import { GameService } from '@application/services/game/game.service';
import { LanguageService } from '@application/services/language/language.service';
import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '@interface/components/breadcrumbs/breadcrumbs.component';
import { BackToTopButtonComponent } from '@interface/components/back-to-top-button/back-to-top-button.component';
import { TranslationContent } from '@shared/constants/app.constants'; // Importar TranslationContent

@Component({
  selector: 'app-game-detail-page',
  templateUrl: './game-detail-page.component.html',
  styleUrls: ['./game-detail-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MarkdownModule,
    LoadingSpinnerComponent,
    BreadcrumbsComponent,
    BackToTopButtonComponent,
  ],
})
export class GameDetailPageComponent implements OnInit, OnDestroy {
  game = signal<Game | undefined>(undefined);
  isLoading = signal(true);

  // Sinal computado para acessar as traduções reativamente
  translations = computed<TranslationContent>(() =>
    this.languageService.translations(),
  );

  private gameId: string | null = null;
  private gameSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    // Obtém o ID do jogo da rota
    this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id');
      this.loadGameDetails();
    });

    // Inscreve-se para mudanças de idioma para recarregar os detalhes do jogo
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
        this.loadGameDetails(); // Recarrega os detalhes do jogo com as novas traduções
      },
    );
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  /**
   * Carrega os detalhes do jogo usando o GameService.
   */
  private loadGameDetails(): void {
    if (!this.gameId) {
      this.game.set(undefined);
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    // O GameService agora retorna o jogo já traduzido
    this.gameSubscription = this.gameService
      .getGameById(this.gameId)
      .subscribe({
        next: (game: Game | undefined) => {
          this.game.set(game);
          this.isLoading.set(false);
        },
        error: (err: any) => {
          console.error('Erro ao carregar detalhes do jogo:', err);
          this.game.set(undefined);
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Navega de volta para a página da lista de jogos.
   */
  backToList(): void {
    this.router.navigate(['/games']);
  }

  /**
   * Retorna os itens do breadcrumb para a página de detalhes do jogo.
   */
  get breadcrumbs(): BreadcrumbItem[] {
    const gameName = this.game()?.name || this.translations()['gameNotFound'];
    return [
      { name: this.translations()['homeBreadcrumb'], path: '/home' },
      { name: this.translations()['gamesBreadcrumb'], path: '/games' },
      { name: gameName, path: null },
    ];
  }
}
