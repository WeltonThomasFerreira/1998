// src/app/interface/pages/game-list/game-list-page.component.ts

import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule
import { Subscription } from 'rxjs';

import { Game, GAME_CATEGORIES } from '@domain/models/game.model';
import { GameService } from '@application/services/game/game.service';
import { LanguageService } from '@application/services/language/language.service';
import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '@interface/components/breadcrumbs/breadcrumbs.component';
import { FilterCategoryTypesPipe } from '@shared/pipes/filter-category-types/filter-category-types-pipe';

@Component({
  selector: 'app-game-list-page',
  templateUrl: './game-list-page.component.html',
  styleUrls: ['./game-list-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule, // Added here
    LoadingSpinnerComponent,
    BreadcrumbsComponent,
    FilterCategoryTypesPipe,
  ],
})
export class GameListPageComponent implements OnInit, OnDestroy {
  allGames = signal<Game[]>([]);
  filteredGames = signal<Game[]>([]);
  displayedGames = signal<Game[]>([]);
  isLoading = signal(true);
  isLoadingMore = signal(false);

  searchTerm = signal('');
  selectedCategoryType = signal('');
  selectedCategoryValue = signal('');
  displayCount = signal(5);

  translations = computed(() => this.languageService.translations);
  availableCategoryTypes = computed(() => Object.values(GAME_CATEGORIES));
  availableCategoryValues = computed(() => {
    const type = this.selectedCategoryType();
    if (!type) return [];
    // Acesso corrigido para game.categories[type]
    return [
      ...new Set(
        this.allGames().map((game: Game) =>
          game.categories ? game.categories[type] : undefined,
        ),
      ),
    ].filter(Boolean);
  });
  canLoadMore = computed(
    () => this.displayedGames().length < this.filteredGames().length,
  );

  private gameSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private gameService: GameService,
    private languageService: LanguageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAllGames();

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
        this.loadAllGames();
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

  private loadAllGames(): void {
    this.isLoading.set(true);
    this.gameSubscription = this.gameService.getAllGames().subscribe({
      next: (games: Game[]) => {
        this.allGames.set(games);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar todos os jogos:', err);
        this.allGames.set([]);
        this.filteredGames.set([]);
        this.displayedGames.set([]);
        this.isLoading.set(false);
      },
    });
  }

  applyFilters(): void {
    const term = this.searchTerm().toLowerCase();
    const type = this.selectedCategoryType();
    const value = this.selectedCategoryValue();

    const filtered = this.allGames().filter((game: Game) => {
      const matchesSearch = game.name.toLowerCase().includes(term);
      // Acesso corrigido para game.categories[type]
      const matchesCategory =
        !type || !value || (game.categories && game.categories[type] === value);
      return matchesSearch && matchesCategory;
    });

    this.filteredGames.set(filtered);
    this.displayCount.set(5);
    this.updateDisplayedGames();
  }

  private updateDisplayedGames(): void {
    this.displayedGames.set(this.filteredGames().slice(0, this.displayCount()));
  }

  loadMoreGames(): void {
    if (this.canLoadMore() && !this.isLoadingMore()) {
      this.isLoadingMore.set(true);
      setTimeout(() => {
        this.displayCount.update((count) => count + 5);
        this.updateDisplayedGames();
        this.isLoadingMore.set(false);
      }, 500);
    }
  }

  navigateToGameDetail(gameId: string): void {
    this.router.navigate(['/games', gameId]);
  }

  get breadcrumbs(): BreadcrumbItem[] {
    return [
      { name: this.translations()['homeBreadcrumb'], path: '/home' },
      { name: this.translations()['gamesBreadcrumb'], path: null },
    ];
  }
}
