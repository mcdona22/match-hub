import { Injectable } from '@angular/core';
import { ITeam } from './i-team';

const Premier = 'Premier';

const teamsKey = 'match-hub.teams';
export const data: ITeam[] = [
  { name: 'Nottingham Forest', postCode: 'n12nf', contacts: [] },
  { name: 'Man United', postCode: 'm12mu', league: Premier, contacts: [] },
  { name: 'Sunderland', postCode: 'su31sm', league: Premier, contacts: [] },
  { name: 'Aston Villa', postCode: 'b123fa', league: Premier, contacts: [] },
  { name: 'Arsenal', postCode: 'ne123xy', league: Premier, contacts: [] },
  { name: 'Liverpool', postCode: 'lv45gg', league: Premier, contacts: [] },
];

@Injectable({ providedIn: 'root' })
export class LocalStorageDataService {
  constructor() {
    console.log(`Storage data service created`);
    const localData = localStorage.getItem(teamsKey);

    if (!localData) {
      const updated = data.map((t) => ({ ...t, id: this.randomKey() }));
      console.log(`Data is not set.  Saving what starter data`, updated);
      // add a team for the cypress tests
      updated.push({
        id: 'test',
        name: 'Test Team FC',
        postCode: 'lv45gg',
        league: 'Test League',
        contacts: [
          { label: 'Manager', value: 'manager@test.com', contactType: 'EMAIL' },
        ],
      });
      localStorage.setItem(teamsKey, JSON.stringify(updated));
    }
  }

  allTeams() {
    return this.allLocallyStoredTeams().sort(this.sortTeam);
  }

  findTeam(id: string): ITeam | undefined {
    const teams = this.allTeams();
    return teams.find((t) => t.id === id);
  }

  addTeam(team: Partial<ITeam>): ITeam {
    const modifiedTeam = { ...team, id: this.randomKey() };
    const teams = this.allTeams();
    const updatedTeams = [...teams, modifiedTeam];
    localStorage.setItem(teamsKey, JSON.stringify(updatedTeams));
    return modifiedTeam as ITeam;
  }

  private allLocallyStoredTeams() {
    const localData = localStorage.getItem(teamsKey);
    return localData ? (JSON.parse(localData!) as ITeam[]) : ([] as ITeam[]);
  }

  private randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();

  private sortTeam(a: ITeam, b: ITeam) {
    return a.name > b.name ? 1 : -1;
  }
}
