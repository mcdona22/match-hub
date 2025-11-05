import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { PostcodeFormatPipe } from '../../../common/postCode.pipe';
import { ContactTile } from '../../../contacts/presentation/contact-tile/contact-tile';

@Component({
  selector: 'app-team-summary-view',
  imports: [PostcodeFormatPipe, ContactTile],
  templateUrl: './team-summary-view.html',
  styleUrl: './team-summary-view.scss',
})
export class TeamSummaryView {
  team = input.required<ITeam>();
}
