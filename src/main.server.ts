// src/main.server.ts

import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment'; // Caminho corrigido para o nível correto
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { MOCK_GAMES } from './app/infrastructure/data/mock-games'; // Caminho e nome da constante corrigidos

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export function getPrerenderParams(): Record<string, string>[] {
  // Usando MOCK_GAMES para gerar os parâmetros de prerendering
  return MOCK_GAMES.map((game) => ({ id: game.id }));
}
