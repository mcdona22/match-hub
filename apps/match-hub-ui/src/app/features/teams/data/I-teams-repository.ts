import { ITeam } from './i-team';

export interface ITeamsRepository {
  readAllTeams(): Promise<ITeam[]>;
}
