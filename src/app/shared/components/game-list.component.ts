import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../features/game/data/games.data';
import { GameService } from '../../features/game/services/game.service';
import { GameCardComponent } from './game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  private readonly gameService: GameService = inject(GameService);
  public games = signal<Game[]>([]);

  constructor() {
    this.games.set(this.gameService.getAllGames());
  }
}
