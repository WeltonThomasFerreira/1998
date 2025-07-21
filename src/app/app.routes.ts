import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { LayoutComponent } from './components/layout/layout.component';

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
