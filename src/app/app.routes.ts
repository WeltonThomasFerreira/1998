import { Routes } from '@angular/router';
import { GameDetailsComponent } from './features/game/pages/game-details.component';
import { LayoutComponent } from './features/layout/components/layout.component';
import { HomeComponent } from './features/home/pages/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: '1998 - Início' },
      {
        path: 'game/:id',
        component: GameDetailsComponent,
        title: '1998 - Detalhes do Jogo',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
