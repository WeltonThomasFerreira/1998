import { Injectable } from '@angular/core';
import { Game, GAMES_DATA } from '../data/games.data';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public getAllGames(): Game[] {
    return GAMES_DATA;
  }

  public getGameById(id: string): Game | undefined {
    return GAMES_DATA.find((game) => game.id === id);
  }
}
