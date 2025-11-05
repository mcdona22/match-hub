import { ITeam } from './i-team';
import { ITeamsRepository } from './I-teams-repository';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';

export const TEAMS_URL = '/api/teams';

@Injectable({ providedIn: 'root' })
export class TeamsRepositoryHttp implements ITeamsRepository {
  http = inject(HttpClient);

  readAllTeams(): Observable<ITeam[]> {
    const response$ = this.http.get<ITeam[]>(TEAMS_URL);
    return response$.pipe(
      tap((teams: ITeam[]) => console.log(`http teams`, teams)),
      first(),
    );
  }

  writeTeam(team: ITeam): Observable<ITeam> {
    const response$ = this.http.post<ITeam>(TEAMS_URL, team);

    return response$.pipe(
      tap((team) => console.log(`created team`, team)),
      first(),
    );
  }

  readTeam(id: string): Observable<ITeam> {
    const path = `${TEAMS_URL}/${id}`;
    const response$ = this.http.get<ITeam>(path);
    return response$.pipe(
      tap((team: ITeam) => console.log(`Single team response`, team)),
      first(),
    );
  }
}
