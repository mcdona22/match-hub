import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Teams } from './features/teams/presentation/teams/teams';
import { TeamForm } from './features/teams/presentation/team-form/team-form';
import { TeamView } from './features/teams/presentation/team-view/team-view';

export const teamsPath = 'teams';
export const newSegment = 'new';
export const teamDetailSegment = ':id';
export const routes: Routes = [
  { path: '', title: 'Home', component: Home },
  {
    path: teamsPath,
    // title: 'Teams',
    // component: Teams,
    children: [
      { path: '', component: Teams, title: 'Teams' },
      { path: newSegment, title: 'New Team', component: TeamForm },
      { path: teamDetailSegment, title: 'Team Detail', component: TeamView },
    ],
  },
];
