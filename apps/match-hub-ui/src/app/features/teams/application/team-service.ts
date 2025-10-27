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

type TeamData = ITeam[] | undefined;

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  teamsRepository: ITeamsRepository = inject(TeamsRepositoryStub);

  fetchTeams(): Signal<TeamData> {
    const teamsSignal: WritableSignal<TeamData> = signal(undefined);
    this.teamsRepository.readAllTeams().then((teams: ITeam[]) => {
      teamsSignal.set(teams);
      console.log(`the repo has fulfilled its service`);
    });
    console.log(`returning initial signal - undefined`);
    return teamsSignal;
  }
}
