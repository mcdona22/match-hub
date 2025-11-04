import { Component, inject, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { teamsPath } from '../../../../app.routes';

@Component({
  selector: 'app-team-tile',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './team-tile.html',
  styleUrl: './team-tile.scss',
})
export class TeamTile {
  router = inject(Router);
  team = input.required<ITeam>();

  onNavigate(id: string) {
    console.log(`Navigate with id ${id}`);
    this.router.navigate([teamsPath, id]);
  }
}
