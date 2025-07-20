import {
  Component,
  inject,
  HostListener,
  Signal,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../data/games.data';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  private readonly gameService = inject(GameService);
  public readonly games: Signal<Game[]> = this.gameService.games;
  private readonly _platformId: Object = inject(PLATFORM_ID);

  public readonly listTitle: string = 'Nossos Jogos';
  public readonly noGamesMessage: string = 'Nenhum jogo encontrado.';
  public readonly viewRulesButtonLabel: string = 'Ver Regras';

  @HostListener('window:resize')
  public onResize(): void {}

  public getGridCols(): number {
    if (isPlatformBrowser(this._platformId)) {
      if (window.innerWidth < environment.BREAKPOINTS.mobile) {
        return 1;
      } else if (window.innerWidth < environment.BREAKPOINTS.tablet) {
        return 2;
      } else {
        return 3;
      }
    }
    return 1;
  }
}
