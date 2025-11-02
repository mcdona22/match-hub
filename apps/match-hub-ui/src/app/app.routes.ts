import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Teams } from './features/teams/presentation/teams/teams';
import { TeamForm } from './features/teams/presentation/team-form/team-form';

export const teamsPath = 'teams';
export const newSegment = 'new';
export const routes: Routes = [
  { path: '', title: 'Home', component: Home },
  {
    path: teamsPath,
    // title: 'Teams',
    // component: Teams,
    children: [
      { path: '', component: Teams, title: 'Teams' },
      { path: newSegment, title: 'New Team', component: TeamForm },
    ],
  },
];
