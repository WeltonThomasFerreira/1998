import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconService } from '../../../core/services/icon.service';
import { GameListComponent } from '../../../shared/components/game-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, GameListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly iconService: IconService = inject(IconService);

  constructor() {
    // IconService is initialized in its constructor, no need to call registerIcons here.
    // Ensure IconService is imported and provided in app.config.ts if not already.
  }
}
