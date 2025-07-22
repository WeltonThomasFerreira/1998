// src/app/interface/components/breadcrumbs/breadcrumbs.component.ts

import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { LanguageService } from '@application/services/language/language.service';

/**
 * Interface para um item de breadcrumb.
 */
export interface BreadcrumbItem {
  name: string; // Nome a ser exibido no breadcrumb
  path: string | null; // Rota para navegar, ou null se for o item atual
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class BreadcrumbsComponent {
  @Input({ required: true }) path: BreadcrumbItem[] = [];

  translations = computed(() => this.languageService.translations);

  constructor(private languageService: LanguageService) {}
}
