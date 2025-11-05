import { ITeam } from './i-team';
import { Observable } from 'rxjs';

export interface ITeamsRepository {
  readAllTeams(): Observable<ITeam[]>;

  writeTeam(team: ITeam): Observable<ITeam>;

  readTeam(id: string): Observable<ITeam>;
}
