import {
  Component,
  signal,
  effect,
  HostBinding,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('1998');
  public isMobile = signal(false);
  public isDarkTheme = signal(false);
  public readonly currentYear: number = new Date().getFullYear();

  private readonly _platformId: Object = inject(PLATFORM_ID);

  @HostBinding('class') get themeClass() {
    return this.isDarkTheme() ? 'dark-theme' : 'light-theme';
  }

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
    }

    effect(() => {
      if (isPlatformBrowser(this._platformId)) {
        document.body.classList.toggle('dark-theme', this.isDarkTheme());
        document.body.classList.toggle('light-theme', !this.isDarkTheme());
      }
    });
  }

  private checkMobile(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.isMobile.set(window.innerWidth < environment.BREAKPOINTS.mobile);
    } else {
      this.isMobile.set(false);
    }
  }
}
