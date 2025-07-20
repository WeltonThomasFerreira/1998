import { Component, signal, effect, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('1998');
  isMobile = signal(false);
  sidenavOpened = signal(false);
  isDarkTheme = signal(false);

  @HostBinding('class') get themeClass() {
    return this.isDarkTheme() ? 'dark-theme' : 'light-theme';
  }

  constructor() {
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());

    effect(() => {
      document.body.classList.toggle('dark-theme', this.isDarkTheme());
      document.body.classList.toggle('light-theme', !this.isDarkTheme());
    });
  }

  private checkMobile(): void {
    this.isMobile.set(window.innerWidth < 768);
  }

  toggleSidenav(): void {
    this.sidenavOpened.update((value) => !value);
  }

  toggleTheme(): void {
    this.isDarkTheme.update((value) => !value);
  }

  changeLanguage(lang: string): void {
    console.log(`Mudar idioma para: ${lang}`);
  }
}
