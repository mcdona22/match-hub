import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { PostcodeFormatPipe } from '../../../common/postCode.pipe';
import { ContactTile } from '../../../contacts/presentation/contact-tile/contact-tile';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-team-summary-view',
  imports: [PostcodeFormatPipe, ContactTile, MatDivider],
  templateUrl: './team-summary-view.html',
  styleUrl: './team-summary-view.scss',
})
export class TeamSummaryView {
  team = input.required<ITeam>();
}
