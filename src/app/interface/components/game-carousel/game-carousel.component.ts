// src/app/interface/components/game-carousel/game-carousel.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Game } from '@domain/models/game.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TranslationContent } from '@shared/constants/app.constants';

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LoadingSpinnerComponent,
  ],
})
export class GameCarouselComponent implements OnChanges {
  @Input() games: Game[] | null = [];
  @Input() translations!: TranslationContent;
  // Alterado: currentLanguage agora é um signal interno para maior reatividade
  @Input({ required: true }) set currentLanguageInput(value: string) {
    this.currentLanguage.set(value);
  }
  currentLanguage = signal(''); // Signal interno para o idioma atual

  @Output() selectGame = new EventEmitter<string>();

  currentIndex = signal(0);
  displayedGame = computed(() => {
    const currentGames = this.games;
    const lang = this.currentLanguage(); // Acessa o valor do signal
    console.log('GameCarousel (computed): games input:', currentGames);
    if (!currentGames || currentGames.length === 0) {
      console.log(
        'GameCarousel (computed): No games to display or games array is empty.',
      );
      return null;
    }
    const game = currentGames[this.currentIndex()];
    console.log('GameCarousel (computed): displayedGame object:', game);
    console.log(
      'GameCarousel (computed): currentLanguage input (from signal):',
      lang,
    );

    if (game) {
      console.log('GameCarousel (computed): game.name object:', game.name);
      console.log(
        'GameCarousel (computed): game.description object:',
        game.description,
      );
      console.log('GameCarousel (computed): Translated Name:', game.name[lang]);
      console.log(
        'GameCarousel (computed): Translated Description:',
        game.description[lang],
      );
    }
    return game;
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('GameCarousel (ngOnChanges): Changes detected:', changes);
    // O currentLanguageInput setter já lida com a atualização do signal currentLanguage
    // console.log('GameCarousel (ngOnChanges): currentLanguage received:', this.currentLanguage()); // Este log agora usaria o signal

    if (
      changes['games'] &&
      changes['games'].currentValue !== changes['games'].previousValue
    ) {
      this.currentIndex.set(0);
      console.log(
        'GameCarousel (ngOnChanges): Games input changed, resetting index to 0.',
      );
    }
  }

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
