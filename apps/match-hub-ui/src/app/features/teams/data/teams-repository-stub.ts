import { Injectable } from '@angular/core';
import { ITeam } from './i-team';
import { ITeamsRepository } from './I-teams-repository';

const teamsKey = 'match-hub.teams';

export const data: ITeam[] = [
  { id: '1', name: 'Nottingham Forest', postCode: 'n12nf' },
  { id: '2', name: 'Man United', postCode: 'm12mu' },
  { id: '3', name: 'Sunderland', postCode: 'su31sm' },
  { id: '4', name: 'Aston Villa', postCode: 'b123fa' },
  { id: '5', name: 'Arsenal', postCode: 'ne123xy' },
  { id: '6', name: 'Liverpool', postCode: 'lv45gg' },
].sort((a, b) => (a.name > b.name ? 1 : -1));

@Injectable({
  providedIn: 'root',
})
export class TeamsRepositoryStub implements ITeamsRepository {
  delay = 300;

  constructor() {
    console.log(`In the constructor`);
    const localData = localStorage.getItem(teamsKey);
    if (!localData) {
      console.log(`Data is not set.  Saving what starter data`, data);
      localStorage.setItem(teamsKey, JSON.stringify(data));
    }
  }

  async readAllTeams(): Promise<ITeam[]> {
    console.log(`initiating fetch in repo`);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log(`readAllTeams complete after ${this.delay}ms`);
    return this.storedTeams();
  }

  async writeTeam(team: ITeam): Promise<boolean> {
    console.log(`about to write team`, team);
    const storedTeams = this.storedTeams();
    const newTeams = [...storedTeams, team];
    console.log(`REPO - writing some teams`, newTeams);
    localStorage.setItem(teamsKey, JSON.stringify(newTeams));

    return Promise.resolve(true);
  }

  private storedTeams() {
    const localData = localStorage.getItem(teamsKey);
    return JSON.parse(localData!) as ITeam[];
  }
}
