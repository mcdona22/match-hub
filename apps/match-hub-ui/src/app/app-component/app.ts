import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  toggleOpened() {
    this.opened.set(!this.opened());
  }
}
