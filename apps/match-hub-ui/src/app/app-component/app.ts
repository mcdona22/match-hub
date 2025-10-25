import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface MenuOption {
  caption: string;
  path: string;
  dataTag: string;
}

const toolBarOptions: MenuOption[] = [
  { caption: 'Teams', path: 'teams', dataTag: 'teams' },
  { caption: 'Calendar', path: 'calendar', dataTag: 'calendar' },
];

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatToolbar,

    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  opened = signal(false);
  menuOptions = toolBarOptions;

  toggleOpened() {
    this.opened.set(!this.opened());
  }
}
