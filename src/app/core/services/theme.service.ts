import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkTheme = signal<boolean>(false);
  private readonly platformId: object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkTheme.set(prefersDark.matches);
      prefersDark.addEventListener('change', (e) =>
        this.isDarkTheme.set(e.matches),
      );
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.toggle('dark-theme', this.isDarkTheme());
        document.body.classList.toggle('light-theme', !this.isDarkTheme());
      }
    });
  }

  public toggleTheme(): void {
    this.isDarkTheme.update((value: boolean) => !value);
  }
}
