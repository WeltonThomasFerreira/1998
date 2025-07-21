import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { GAMES_DATA } from './app/features/game/data/games.data';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export function getPrerenderParams(): Record<string, string>[] {
  return GAMES_DATA.map((game) => ({ id: game.id }));
}
