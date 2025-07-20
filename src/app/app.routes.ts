import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: '1998 - Início' },
  { path: '**', redirectTo: '' },
];
