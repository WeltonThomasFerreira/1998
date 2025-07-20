import {
  Component,
  signal,
  effect,
  HostBinding,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public isMobile = signal<boolean>(false);
  public isDarkTheme = signal<boolean>(false);
  public readonly currentYear: number = new Date().getFullYear();

  private readonly platformId: Object = inject(PLATFORM_ID);
  private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  @HostBinding('class')
  public get themeClass(): string {
    return this.isDarkTheme() ? 'dark-theme' : 'light-theme';
  }

  public constructor() {
    this.registerIcons();

    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDarkTheme.set(prefersDark.matches);
      prefersDark.addEventListener('change', (e) => this.isDarkTheme.set(e.matches));
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.toggle('dark-theme', this.isDarkTheme());
        document.body.classList.toggle('light-theme', !this.isDarkTheme());
      }
    });
  }

  private checkMobile(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < environment.BREAKPOINTS.mobile);
    }
  }

  private registerIcons(): void {
    this.matIconRegistry.addSvgIcon(
      'cards-playing',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/cards-playing.svg',
      ),
    );
  }
}
