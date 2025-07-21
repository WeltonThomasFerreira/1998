import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../core/services/theme.service';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { IconService } from '../../../core/services/icon.service';

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
  public readonly themeService: ThemeService = inject(ThemeService);
  public readonly responsiveService: ResponsiveService = inject(ResponsiveService);
  private readonly iconService: IconService = inject(IconService); // Ensure it's instantiated

  public readonly currentYear: number = new Date().getFullYear();

  constructor() {
    // IconService is initialized in its constructor, no need to call registerIcons here.
    // ThemeService and ResponsiveService handle their own initialization.
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
