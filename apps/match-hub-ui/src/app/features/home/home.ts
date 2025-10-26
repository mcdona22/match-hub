import { Component, signal } from '@angular/core';
import { TeamsList } from '../teams/presentation/teams-list/teams-list';

@Component({
  selector: 'app-home',
  imports: [TeamsList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  teams = signal(
    [
      { id: '1', name: 'Nottingham Forest' },
      { id: '2', name: 'Man United' },
      { id: '3', name: 'Sunderland' },
      { id: '4', name: 'Aston Villa' },
      { id: '5', name: 'Arsenal' },
      { id: '6', name: 'Liverpool' },
    ].sort((a, b) => (a.name > b.name ? 1 : -1)),
  );
}
