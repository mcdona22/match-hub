import { ITeam } from './i-team';

export interface ITeamsRepository {
  readAllTeams(): Promise<ITeam[]>;

  writeTeam(team: ITeam): Promise<boolean>;
}
