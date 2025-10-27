import { Injectable } from '@angular/core';
import { ITeam } from './i-team';
import { ITeamsRepository } from './I-teams-repository';

const data: ITeam[] = [
  { id: '1', name: 'Nottingham Forest' },
  { id: '2', name: 'Man United' },
  { id: '3', name: 'Sunderland' },
  { id: '4', name: 'Aston Villa' },
  { id: '5', name: 'Arsenal' },
  { id: '6', name: 'Liverpool' },
].sort((a, b) => (a.name > b.name ? 1 : -1));

@Injectable({
  providedIn: 'root',
})
export class TeamsRepositoryStub implements ITeamsRepository {
  delay = 2150;

  async readAllTeams(): Promise<ITeam[]> {
    console.log(`initiating fetch in repo`);
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log(`readAllTeams complete after ${this.delay}ms`);
    return data;
  }
}
