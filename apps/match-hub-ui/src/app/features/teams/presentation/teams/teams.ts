import { Component, computed, effect, inject, model } from '@angular/core';
import { TeamService } from '../../application/team-service';
import { TeamsList } from '../teams-list/teams-list';
import { ITeam } from '../../data/i-team';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { newSegment, teamsPath } from '../../../../app.routes';

@Component({
  selector: 'app-teams',
  imports: [
    TeamsList,
    MatProgressSpinnerModule,
    MatInput,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  router = inject(Router);

  teamsService = inject(TeamService);

  fetchedTeams = this.teamsService.fetchTeams();
  nonsense = model('initial value');
  waiting = computed(() => this.fetchedTeams == undefined);
  teams = computed(() => {
    return (
      this.fetchedTeams() === undefined ? [] : this.fetchedTeams()
    ) as ITeam[];
  });

  constructor() {
    console.log(`constructor`);
    effect(() =>
      console.log(`Change in value from teams service`, this.fetchedTeams()),
    );
  }

  onNew() {
    console.log(`Navigate to new`);
    this.router
      .navigate([teamsPath, newSegment])
      .then(() => console.log(`Nav complete`));
  }
}
