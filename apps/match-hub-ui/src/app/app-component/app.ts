import { Component, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { teamsPath } from '../app.routes';
import { LoadingSpinner } from '../features/loading/presentation/loading-spinner/loading-spinner';

interface MenuOption {
  caption: string;
  path: string;
  dataTag: string;
}

export const toolBarOptions: MenuOption[] = [
  { caption: 'Home', path: '/', dataTag: 'home' },
  { caption: 'Teams', path: teamsPath, dataTag: 'teams' },
  // { caption: 'Calendar', path: 'calendar', dataTag: 'calendar' },
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
    LoadingSpinner,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  router = inject(Router);
  opened = signal(false);
  menuOptions = toolBarOptions;
  protected readonly toolBarOptions = toolBarOptions;

  toggleOpened() {
    this.opened.set(!this.opened());
  }

  onNavigate(path: string) {
    this.router.navigate([path]).then(() => this.opened.set(false));
  }
}
