// src/main.server.ts

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { GAMES_DATA } from './app/domain/data/games.data'; // Caminho e nome da constante corrigidos para GAMES_DATA

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export function getPrerenderParams(): Record<string, string>[] {
  // Usando GAMES_DATA para gerar os parâmetros de prerendering
  return GAMES_DATA.map((game) => ({ id: game.id }));
}
