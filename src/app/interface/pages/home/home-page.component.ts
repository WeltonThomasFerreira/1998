// src/app/interface/pages/home/home-page.component.ts

import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { Game } from '@domain/models/game.model';
import { GameService } from '@application/services/game/game.service';
import { LanguageService } from '@application/services/language/language.service';
import { GameCarouselComponent } from '@interface/components/game-carousel/game-carousel.component';
import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component';
import { TranslationContent } from '@shared/constants/app.constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    GameCarouselComponent,
    LoadingSpinnerComponent,
  ],
})
export class HomePageComponent implements OnInit, OnDestroy {
  featuredGames = signal<Game[] | null>(null);
  isLoading = signal(true);

  translations = computed<TranslationContent>(() =>
    this.languageService.translations(),
  );
  currentLanguage = computed<string>(
    () => this.languageService.currentLanguage,
  );

  private gameSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private languageService: LanguageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Inicializa o carregamento dos jogos
    this.loadFeaturedGames();

    // Inscreve-se para mudanças de idioma para recarregar os jogos.
    // O GameService já reage ao idioma, mas esta subscrição garante que o
    // `loadFeaturedGames` seja explicitamente chamado, o que pode ser útil
    // para redefinir o estado de carregamento e garantir a re-emissão.
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
        console.log(
          'HomePageComponent: Language changed, reloading featured games.',
        ); // Log para depuração
        this.loadFeaturedGames();
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
   * Carrega os jogos em destaque do serviço.
   */
  loadFeaturedGames(): void {
    this.isLoading.set(true);
    console.log('HomePageComponent: Calling GameService.getFeaturedGames()'); // Log para depuração
    this.gameSubscription = this.gameService.getFeaturedGames().subscribe({
      next: (games: Game[]) => {
        console.log('HomePageComponent: Received featured games:', games); // Log para depuração
        this.featuredGames.set(games);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar jogos em destaque:', err);
        this.featuredGames.set([]);
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Navega para a página de detalhes de um jogo específico.
   * @param gameId O ID do jogo a ser visualizado.
   */
  navigateToGameDetail(gameId: string): void {
    this.router.navigate(['/games', gameId]);
  }

  /**
   * Navega para a página de todos os jogos.
   */
  navigateToAllGames(): void {
    this.router.navigate(['/games']);
  }
}
