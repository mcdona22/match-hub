import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TeamService } from '../../application/team-service';
import { PostcodeFormatPipe } from '../../../common/postCode.pipe';

@Component({
  selector: 'app-team-view',
  imports: [AsyncPipe, PostcodeFormatPipe],
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
