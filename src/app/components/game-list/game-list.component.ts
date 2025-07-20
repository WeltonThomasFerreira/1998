import { Component, inject, HostListener, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../data/games.data';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

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
  private readonly _gameService: GameService = inject(GameService);
  public readonly games: Signal<Game[]> = this._gameService.games;

  private readonly _listTitle: string = 'Nossos Jogos';
  private readonly _noGamesMessage: string = 'Nenhum jogo encontrado.';

  private readonly _mobileBreakpoint: number = 600;
  private readonly _tabletBreakpoint: number = 960;

  public get listTitle(): string {
    return this._listTitle;
  }

  public get noGamesMessage(): string {
    return this._noGamesMessage;
  }

  @HostListener('window:resize')
  public onResize(): void {
    // This method will be called on window resize, triggering a re-evaluation of getGridCols()
  }

  public getGridCols(): number {
    if (window.innerWidth < this._mobileBreakpoint) {
      return 1;
    } else if (window.innerWidth < this._tabletBreakpoint) {
      return 2;
    } else {
      return 3;
    }
  }
}
