import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-teams-list',
  imports: [JsonPipe],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.scss',
})
export class TeamsList {
  teams = input.required<ITeam[]>();
}
