// src/app/interface/pages/about/about-page.component.ts

import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { LanguageService } from '@application/services/language/language.service';
import {
  BreadcrumbsComponent,
  BreadcrumbItem,
} from '@interface/components/breadcrumbs/breadcrumbs.component';

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
export class AboutPageComponent {
  translations = computed(() => this.languageService.translations);

  breadcrumbs = computed<BreadcrumbItem[]>(() => {
    return [
      { name: this.translations().homeBreadcrumb, path: '/home' },
      { name: this.translations().aboutBreadcrumb, path: null },
    ];
  });

  constructor(private languageService: LanguageService) {}
}
