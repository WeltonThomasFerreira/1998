// src/app/interface/components/game-carousel/game-carousel.component.ts

import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // Para routerLink
import { Subscription, interval } from 'rxjs'; // Importar interval e Subscription

import { Game } from '@domain/models/game.model';
import { TranslationContent } from '@shared/constants/app.constants'; // Importar TranslationContent
import { LanguageService } from '@application/services/language/language.service'; // Importar LanguageService
// REMOVIDO: import { LoadingSpinnerComponent } from '@interface/components/loading-spinner/loading-spinner.component'; // Importar LoadingSpinnerComponent

@Component({
  selector: 'app-game-carousel',
  templateUrl: './game-carousel.component.html',
  styleUrls: ['./game-carousel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule, // Adicionar RouterModule para usar routerLink
    // REMOVIDO: LoadingSpinnerComponent, // Adicionar LoadingSpinnerComponent aqui
  ],
})
export class GameCarouselComponent implements OnInit, OnDestroy {
  @Input({ required: true }) games: Game[] = [];
  @Input({ required: true }) translations!: TranslationContent;
  @Input() autoScrollDelay: number = 5000; // Tempo em ms para rolagem automática (5 segundos padrão)
  @Input() cardsToShow: number = 3; // Número de cards visíveis no carrossel

  currentIndex = signal(0); // Índice do primeiro card visível

  // Computed signal para os cards atualmente visíveis
  visibleGames = computed(() => {
    if (!this.games || this.games.length === 0) {
      return [];
    }
    const start = this.currentIndex();
    const end = start + this.cardsToShow;
    // Lida com a "rolagem" infinita, pegando cards do início se o final for atingido
    if (end <= this.games.length) {
      return this.games.slice(start, end);
    } else {
      // Se o final da lista for atingido, pegue o restante e depois do início
      return [
        ...this.games.slice(start),
        ...this.games.slice(0, end - this.games.length),
      ];
    }
  });

  // Expor currentLanguage para uso no template
  currentLanguage = computed<string>(
    () => this.languageService.currentLanguage,
  );

  private autoScrollSubscription!: Subscription;

  constructor(private languageService: LanguageService) {} // Injetar LanguageService

  ngOnInit(): void {
    // Inicia a rolagem automática apenas se houver jogos e o delay for maior que 0
    if (this.games.length > 0 && this.autoScrollDelay > 0) {
      this.startAutoScroll();
    }
  }

  ngOnDestroy(): void {
    // Garante que a inscrição seja desfeita para evitar vazamento de memória
    this.stopAutoScroll();
  }

  /**
   * Inicia a rolagem automática do carrossel.
   */
  private startAutoScroll(): void {
    this.stopAutoScroll(); // Limpa qualquer intervalo existente
    this.autoScrollSubscription = interval(this.autoScrollDelay).subscribe(
      () => {
        this.nextSlide();
      },
    );
  }

  /**
   * Para a rolagem automática do carrossel.
   */
  private stopAutoScroll(): void {
    if (this.autoScrollSubscription) {
      this.autoScrollSubscription.unsubscribe();
    }
  }

  /**
   * Navega para o próximo slide do carrossel.
   */
  nextSlide(): void {
    this.currentIndex.update(
      (prevIndex) => (prevIndex + 1) % this.games.length,
    );
    this.startAutoScroll(); // Reinicia o timer após interação manual
  }

  /**
   * Navega para o slide anterior do carrossel.
   */
  prevSlide(): void {
    this.currentIndex.update(
      (prevIndex) => (prevIndex - 1 + this.games.length) % this.games.length,
    );
    this.startAutoScroll(); // Reinicia o timer após interação manual
  }
}
