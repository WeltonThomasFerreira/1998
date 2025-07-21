import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { Game, GAMES_DATA } from '../../data/games.data';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
})
export class GameListComponent {
  public games = signal<Game[]>(GAMES_DATA);
}
