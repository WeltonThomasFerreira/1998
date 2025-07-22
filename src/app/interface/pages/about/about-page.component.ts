// src/app/interface/pages/about/about-page.component.ts

import { Component, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';

import { LanguageService } from '@application/services/language/language.service';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '@interface/components/breadcrumbs/breadcrumbs.component';
import { TranslationContent } from '@shared/constants/app.constants'; // Importar TranslationContent

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    BreadcrumbsComponent,
  ],
})
export class AboutPageComponent implements OnInit, OnDestroy {
  // Sinal computado para acessar as traduções reativamente
  translations = computed<TranslationContent>(() =>
    this.languageService.translations(),
  );

  private languageSubscription!: Subscription;

  constructor(
    private router: Router,
    private languageService: LanguageService,
  ) {}

  ngOnInit(): void {
    // Inscreve-se para mudanças de idioma para garantir que os breadcrumbs e textos sejam atualizados
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      () => {
        // O sinal 'translations' já é reativo, mas esta subscrição pode ser útil
        // se houver lógica adicional que dependa da mudança de idioma.
        // Neste caso, apenas a reavaliação do sinal 'translations' já é suficiente.
      },
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  /**
   * Retorna os itens do breadcrumb para a página "Sobre".
   */
  get breadcrumbs(): BreadcrumbItem[] {
    return [
      { name: this.translations()['homeBreadcrumb'], path: '/home' },
      { name: this.translations()['aboutBreadcrumb'], path: null },
    ];
  }

  // Removido o método backToHome()
  // backToHome(): void {
  //   this.router.navigate(['/home']);
  // }
}
