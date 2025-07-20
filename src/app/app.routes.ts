import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  { path: '', component: App, title: '1998 - Início' },
  { path: '**', redirectTo: '' },
];
