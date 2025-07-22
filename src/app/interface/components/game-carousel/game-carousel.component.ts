// src/app/interface/components/game-carousel/game-carousel.component.ts

import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Game } from '@domain/models/game.model';
import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    LoadingSpinnerComponent,
  ],
})
export class GameCarouselComponent {
  @Input({ required: true }) games: Game[] | null = null;
  @Input({ required: true }) translations: any;

  @Output() selectGame = new EventEmitter<string>();

  currentIndex = signal(0);

  displayedGame = computed(() => {
    const games = this.games;
    const index = this.currentIndex();
    return games && games.length > 0 ? games[index] : undefined;
  });

  constructor() {}

  nextSlide(): void {
    if (this.games && this.games.length > 0) {
      this.currentIndex.update((current) => (current + 1) % this.games!.length);
    }
  }

  prevSlide(): void {
    if (this.games && this.games.length > 0) {
      this.currentIndex.update(
        (current) => (current - 1 + this.games!.length) % this.games!.length,
      );
    }
  }

  onSelectGame(gameId: string): void {
    this.selectGame.emit(gameId);
  }
}
