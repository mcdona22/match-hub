import { Injectable } from '@angular/core';
import { ITeam } from './i-team';
import { ITeamsRepository } from './I-teams-repository';

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

  async readAllTeams(): Promise<ITeam[]> {
    console.log(`initiating fetch in repo`);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log(`readAllTeams complete after ${this.delay}ms`);
    return data;
  }
}
