import { Component, computed, inject, model } from '@angular/core';
import { TeamService } from '../../application/team-service';
import { TeamsList } from '../teams-list/teams-list';
import { ITeam } from '../../data/i-team';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-teams',
  imports: [
    TeamsList,
    MatProgressSpinnerModule,
    MatInput,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  teamsService = inject(TeamService);
  fetchedTeams = this.teamsService.fetchTeams();
  nonsense = model('initial value');
  waiting = computed(() => this.fetchedTeams == undefined);
  teams = computed(() => {
    return (
      this.fetchedTeams() === undefined ? [] : this.fetchedTeams()
    ) as ITeam[];
  });
}
