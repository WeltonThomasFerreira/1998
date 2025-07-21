import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
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
