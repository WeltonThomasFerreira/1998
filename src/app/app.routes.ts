// src/app/app.routes.ts

import { Routes } from '@angular/router';

// Importa os componentes de página, que agora serão standalone, usando aliases
import { HomePageComponent } from '@interface/pages/home/home-page.component';
import { GameListPageComponent } from '@interface/pages/game-list/game-list-page.component';
import { GameDetailPageComponent } from '@interface/pages/game-detail/game-detail-page.component'; // Corrigido
import { AboutPageComponent } from '@interface/pages/about/about-page.component';

/**
 * Definição das rotas da aplicação.
 * Utiliza a nova API de roteamento funcional do Angular.
 */
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'games', component: GameListPageComponent },
  { path: 'games/:id', component: GameDetailPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: '/home' },
];
