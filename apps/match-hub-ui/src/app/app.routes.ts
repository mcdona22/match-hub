import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Teams } from './features/teams/presentation/teams/teams';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'teams', component: Teams },
];
