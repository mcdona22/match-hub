import { ITeam } from '../data/i-team';
import { inject, Injectable, Signal } from '@angular/core';
import { ITeamsRepository } from '../data/I-teams-repository';
import { LoadingService } from '../../loading/application/loading-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamsRepositoryHttp } from '../data/teams-repository-http';

export type SingleTeamData = ITeam | undefined;

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  loadingService = inject(LoadingService);
  teamsRepository: ITeamsRepository = inject(TeamsRepositoryHttp);

  fetchTeams(): Signal<ITeam[]> {
    return toSignal(this.teamsRepository.readAllTeams(), { initialValue: [] });
  }

  fetchTeam(id: string) {
    return toSignal(this.teamsRepository.readTeam(id), {
      initialValue: undefined,
    });
  }

  saveTeam(team: ITeam) {
    console.log(`TEAM SERVICE: saving team`, team);
    return this.teamsRepository.writeTeam(team);
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
