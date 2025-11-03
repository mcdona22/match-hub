import { Component, input } from '@angular/core';
import { ITeam } from '../../data/i-team';
import { JsonPipe } from '@angular/common';
import { PostcodeFormatPipe } from '../../../common/postCode.pipe';

@Component({
  selector: 'app-team-summary-view',
  imports: [JsonPipe, PostcodeFormatPipe],
  templateUrl: './team-summary-view.html',
  styleUrl: './team-summary-view.scss',
})
export class TeamSummaryView {
  team = input.required<ITeam>();
}
