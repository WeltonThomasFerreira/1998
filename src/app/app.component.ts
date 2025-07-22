// src/app/app.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; // Adicionado para mat-list-item
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider'; // Adicionado para mat-divider
import { RouterModule } from '@angular/router'; // Adicionado para router-outlet
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ThemeService } from '@application/services/theme/theme.service';
import { LanguageService } from '@application/services/language/language.service';
import { TRANSLATIONS } from '@shared/constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Importado para router-outlet
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule, // Adicionado
    MatSlideToggleModule,
    MatDividerModule, // Adicionado
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isDarkTheme = signal(false);
  currentLanguage = signal('pt');
  translations = computed(() => TRANSLATIONS[this.currentLanguage()]);

  private themeSubscription!: Subscription;
  private languageSubscription!: Subscription;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    this.isDarkTheme.set(this.themeService.currentTheme === 'dark');
    this.currentLanguage.set(this.languageService.currentLanguage);

    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      (theme: string) => {
        this.isDarkTheme.set(theme === 'dark');
      },
    );

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (lang: string) => {
        this.currentLanguage.set(lang);
      },
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  closeSidenav(): void {
    this.sidenav.close();
  }
}
