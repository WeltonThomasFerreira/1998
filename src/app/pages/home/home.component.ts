import { Component, inject } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GameListComponent } from '../../components/game-list/game-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, GameListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly matIconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer: DomSanitizer = inject(DomSanitizer);

  constructor() {
    this.registerIcons();
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
