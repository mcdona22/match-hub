import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';

@Component({
  selector: 'app-teams-list',
  imports: [],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.scss',
})
export class TeamsList {
  teams = input.required<ITeam[]>();
}
