import { Component, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public isMobile = signal<boolean>(false);
  public isDarkTheme = signal<boolean>(false);
  public readonly currentYear: number = new Date().getFullYear();
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  public constructor() {
    this.registerIcons();

    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();
      window.addEventListener('resize', () => this.checkMobile());
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
