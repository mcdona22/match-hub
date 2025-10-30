import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { MatCard, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-team-tile',
  imports: [MatCard, MatCardTitle],
  templateUrl: './team-tile.html',
  styleUrl: './team-tile.scss',
})
export class TeamTile {
  team = input.required<ITeam>();
}
