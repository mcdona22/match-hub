import { Component, computed, inject } from '@angular/core';
import { TeamService } from '../../application/team-service';
import { TeamsList } from '../teams-list/teams-list';
import { ITeam } from '../../data/i-team';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-teams',
  imports: [TeamsList, MatProgressSpinnerModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  teamsService = inject(TeamService);
  fetchedTeams = this.teamsService.fetchTeams();
  waiting = computed(() => this.fetchedTeams == undefined);
  teams = computed(() => {
    return (
      this.fetchedTeams() === undefined ? [] : this.fetchedTeams()
    ) as ITeam[];
  });
}
