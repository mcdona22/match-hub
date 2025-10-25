import { ITeam } from '../data/i-team';
import { Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // <-- This registers the service at the root level
})
export class TeamService {
  fetchTeams(): Signal<ITeam[]> {
    throw new Error('Method not implemented.');
  }
}
