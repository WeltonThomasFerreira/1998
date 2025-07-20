import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Game, GAMES_DATA } from '../../data/games.data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _games: WritableSignal<Game[]> = signal<Game[]>([]);
  public readonly games: Signal<Game[]> = this._games.asReadonly();

  constructor() {
    this.loadGames();
  }

  private loadGames(): void {
    setTimeout(() => {
      this._games.set(GAMES_DATA);
      console.log('Jogos carregados:', this._games());
    }, 500);
  }

  public getGameById(id: string): Signal<Game | undefined> {
    return signal(this._games().find((game: Game) => game.id === id));
  }
}
