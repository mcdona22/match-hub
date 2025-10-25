import { Component } from '@angular/core';
import { TeamsList } from '../teams/presentation/teams-list/teams-list';

@Component({
  selector: 'app-home',
  imports: [TeamsList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
