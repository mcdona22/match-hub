import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { TeamTile } from '../team-tile/team-tile';

@Component({
  selector: 'app-teams-list',
  imports: [TeamTile],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.scss',
})
export class TeamsList {
  teams = input.required<ITeam[]>();
}
