import { Injectable } from '@angular/core';
import { ITeam } from './i-team';
import { ITeamsRepository } from './I-teams-repository';

const teamsKey = 'match-hub.teams';
const Premier = 'Premier';

export const data: ITeam[] = [
  { name: 'Nottingham Forest', postCode: 'n12nf', contacts: [] },
  { name: 'Man United', postCode: 'm12mu', league: Premier, contacts: [] },
  { name: 'Sunderland', postCode: 'su31sm', league: Premier, contacts: [] },
  { name: 'Aston Villa', postCode: 'b123fa', league: Premier, contacts: [] },
  { name: 'Arsenal', postCode: 'ne123xy', league: Premier, contacts: [] },
  { name: 'Liverpool', postCode: 'lv45gg', league: Premier, contacts: [] },
];

@Injectable({
  providedIn: 'root',
})
export class TeamsRepositoryStub implements ITeamsRepository {
  delay = 120;

  constructor() {
    console.log(`In the constructor`);
    const localData = localStorage.getItem(teamsKey);
    if (!localData) {
      const updated = data.map((t) => ({ ...t, id: this.randomKey() }));
      updated.push({
        id: 'test',
        name: 'Test Team FC',
        postCode: 'lv45gg',
        league: 'Test League',
        contacts: [
          { label: 'Manager', value: 'manager@test.com', contactType: 'EMAIL' },
        ],
      });
      console.log(`Data is not set.  Saving what starter data`, updated);
      localStorage.setItem(teamsKey, JSON.stringify(updated));
    }
  }

  async readTeam(id: string): Promise<ITeam> {
    // const team = { id, name: 'Colchester United', postCode: 'hd22su' } as ITeam;
    const team = this.storedTeams().find((team) => team.id === id);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    return team!;
  }

  async readAllTeams(): Promise<ITeam[]> {
    console.log(`initiating fetch in repo`);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log(`readAllTeams complete after ${this.delay} ms`);
    return this.storedTeams();
  }

  async writeTeam(team: ITeam): Promise<boolean> {
    const updatedTeam = { ...team, id: this.randomKey() };
    console.log(`about to write team`, team);

    const storedTeams = this.storedTeams();
    const newTeams = [...storedTeams, updatedTeam];
    console.log(`REPO - writing some teams`, newTeams);
    localStorage.setItem(teamsKey, JSON.stringify(newTeams));
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    return Promise.resolve(true);
  }

  private storedTeams() {
    const localData = localStorage.getItem(teamsKey);
    return JSON.parse(localData!) as ITeam[];
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
