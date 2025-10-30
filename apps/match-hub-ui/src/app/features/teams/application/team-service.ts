import { ITeam } from '../data/i-team';
import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { TeamsRepositoryStub } from '../data/teams-repository-stub';
import { ITeamsRepository } from '../data/I-teams-repository';

export type TeamData = ITeam[] | undefined;

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  teamsRepository: ITeamsRepository = inject(TeamsRepositoryStub);

  fetchTeams(): Signal<TeamData> {
    const teamsSignal: WritableSignal<TeamData> = signal(undefined);

    this.teamsRepository.readAllTeams().then((teams: ITeam[]) => {
      teamsSignal.set(teams);
      console.log(`TeamService: the repo has fulfilled  service`);
    });
    return teamsSignal;
  }
}
