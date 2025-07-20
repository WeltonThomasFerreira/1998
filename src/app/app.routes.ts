import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: '1998 - Início' },
  { path: 'games', component: GameListComponent, title: '1998 - Jogos' },
  {
    path: 'games/:id',
    component: GameDetailComponent,
    title: '1998 - Detalhes do Jogo',
  },
  { path: '**', redirectTo: '' },
];
