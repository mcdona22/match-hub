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
import { map, of, throwError } from 'rxjs';

export type TeamData = ITeam[] | undefined;

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  teamsRepository: ITeamsRepository = inject(TeamsRepositoryStub);

  fetchTeams(): Signal<TeamData> {
    const teamsSignal: WritableSignal<TeamData> = signal(undefined);

    this.teamsRepository.readAllTeams().then((teams: ITeam[]) => {
      teamsSignal.set(teams.sort((t1, t2) => (t1.name > t2.name ? 1 : -1)));
      console.log(`TeamService: the repo has fulfilled  service`);
    });
    return teamsSignal;
  }

  saveTeam(team: ITeam) {
    const savedTeam = { ...team, id: this.randomKey() };
    console.log(`TEAM SERVICE: saving team`, savedTeam);
    if (team.name == 'forest') {
      console.log(`Oops - forest`);
      return throwError(() => new Error('We dont like forest these days'));
    }

    return of(this.teamsRepository.writeTeam(savedTeam)).pipe(
      map((response) => {
        console.log(`The response was good`, response);
        return savedTeam;
      }),
    );
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
