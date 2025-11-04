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
import { from, map, throwError } from 'rxjs';
import { LoadingService } from '../../loading/application/loading-service';

export type TeamData = ITeam[] | undefined;
export type SingleTeamData = ITeam | undefined;

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  loadingService = inject(LoadingService);
  teamsRepository: ITeamsRepository = inject(TeamsRepositoryStub);

  fetchTeams(): Signal<TeamData> {
    const teamsSignal: WritableSignal<TeamData> = signal(undefined);
    this.loadingService.loadingStart();
    this.teamsRepository.readAllTeams().then((teams: ITeam[]) => {
      teamsSignal.set(teams.sort((t1, t2) => (t1.name > t2.name ? 1 : -1)));
      console.log(`TeamService: the repo has fulfilled  service`);
      this.loadingService.loadingStop();
    });
    return teamsSignal;
  }

  fetchTeam(id: string) {
    // const teamsSignal: WritableSignal<SingleTeamData> = signal(undefined);
    const teamSignal: WritableSignal<SingleTeamData> = signal(undefined);
    this.loadingService.loadingStart();
    this.teamsRepository.readTeam(id).then((team: ITeam) => {
      teamSignal.set(team);
      this.loadingService.loadingStop();
    });

    return teamSignal;
    // return from(this.teamsRepository.readTeam(id));
  }

  saveTeam(team: ITeam) {
    console.log(`TEAM SERVICE: saving team`, team);
    if (team.name == 'forest') {
      console.log(`Oops - forest`);
      return throwError(() => new Error('We dont like forest these days'));
    }

    return from(this.teamsRepository.writeTeam(team)).pipe(
      map((response) => {
        console.log(`The response was good`, response);
        return team;
      }),
    );
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
