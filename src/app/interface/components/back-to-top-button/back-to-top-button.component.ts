// src/app/interface/components/back-to-top-button/back-to-top-button.component.ts

import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para @if
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-to-top-button',
  templateUrl: './back-to-top-button.component.html',
  styleUrls: ['./back-to-top-button.component.scss'],
  standalone: true, // Componente standalone
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class BackToTopButtonComponent {
  // Signal para controlar a visibilidade do botão
  isVisible = signal(false);

  constructor() {}

  /**
   * Listener para o evento de scroll da janela.
   * Atualiza a visibilidade do botão com base na posição da rolagem.
   * @param event O evento de scroll.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Define a visibilidade se a rolagem vertical for maior que 300px
    this.isVisible.set(window.pageYOffset > 300);
  }

  /**
   * Rola a página suavemente para o topo.
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Rolagem suave
    });
  }
}
