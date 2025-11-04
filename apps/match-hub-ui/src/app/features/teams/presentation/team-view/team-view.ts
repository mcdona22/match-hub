import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../application/team-service';
import { TeamSummaryView } from '../team-summary-view/team-summary-view';

@Component({
  selector: 'app-team-view',
  imports: [TeamSummaryView],
  templateUrl: './team-view.html',
  styleUrl: './team-view.scss',
})
export class TeamView {
  route = inject(ActivatedRoute);
  teamService = inject(TeamService);
  id = this.route.snapshot.paramMap.get('id');

  team = this.teamService.fetchTeam(this.id!);

  // id = toSignal(this.route.snapshot.params['id'], { initialValue: 'not yet' });

  someText = 'This is some text';
}
