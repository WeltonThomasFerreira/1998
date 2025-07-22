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

  translations = computed(() => this.languageService.translations);

  private gameSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private languageService: LanguageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFeaturedGames();

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
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

  private loadFeaturedGames(): void {
    this.isLoading.set(true);
    this.gameSubscription = this.gameService.getFeaturedGames().subscribe({
      next: (games: Game[]) => {
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

  navigateToGameDetail(gameId: string): void {
    this.router.navigate(['/games', gameId]);
  }

  navigateToAllGames(): void {
    this.router.navigate(['/games']);
  }
}
