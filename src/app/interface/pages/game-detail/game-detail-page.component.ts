// src/app/interface/pages/game-detail/game-detail-page.component.ts

import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';
import { Subscription } from 'rxjs';

import { Game } from '@domain/models/game.model';
import { GameService } from '@application/services/game/game.service';
import { LanguageService } from '@application/services/language/language.service';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '@interface/components/breadcrumbs/breadcrumbs.component';
import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component';
import { BackToTopButtonComponent } from '@interface/components/back-to-top-button/back-to-top-button.component';

@Component({
  selector: 'app-game-detail-page',
  templateUrl: './game-detail-page.component.html',
  styleUrls: ['./game-detail-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MarkdownModule,
    BreadcrumbsComponent,
    LoadingSpinnerComponent,
    BackToTopButtonComponent,
  ],
})
export class GameDetailPageComponent implements OnInit, OnDestroy {
  game = signal<Game | undefined>(undefined);
  isLoading = signal(true);
  gameId: string | null = null;

  translations = computed(() => this.languageService.translations);

  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const gameName = this.game()?.name || this.translations().gameNotFound;
    return [
      { name: this.translations().homeBreadcrumb, path: '/home' },
      { name: this.translations().gamesBreadcrumb, path: '/games' },
      { name: gameName, path: null },
    ];
  });

  private routeSubscription!: Subscription;
  private gameServiceSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.loadGameDetails(this.gameId);
      } else {
        this.game.set(undefined);
        this.isLoading.set(false);
      }
    });

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
        if (this.gameId) {
          this.loadGameDetails(this.gameId);
        }
      },
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.gameServiceSubscription) {
      this.gameServiceSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadGameDetails(id: string): void {
    this.isLoading.set(true);
    this.gameServiceSubscription = this.gameService.getGameById(id).subscribe({
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

  backToList(): void {
    this.router.navigate(['/games']);
  }
}
