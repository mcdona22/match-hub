import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';
import { postCodeValidator } from '../../../common/post-code-validator';
import { TeamService } from '../../application/team-service';
import { ITeam } from '../../data/i-team';
import { Router } from '@angular/router';
import { LoadingService } from '../../../loading/application/loading-service';
import { teamsPath } from '../../../../app.routes';

@Component({
  selector: 'app-team-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule],
  templateUrl: './team-form.html',
  styleUrl: './team-form.scss',
})
export class TeamForm {
  readonly minName = 4;
  readonly maxName = 20;

  teamService = inject(TeamService);
  loadingService = inject(LoadingService);
  router = inject(Router);

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(this.minName),
        Validators.maxLength(this.maxName),
      ],
    }),
    postCode: new FormControl('', {
      validators: [Validators.required, postCodeValidator()],
    }),
    league: new FormControl('', {
      validators: [Validators.maxLength(this.maxName)],
    }),
  });

  // protected readonly max = max;

  get name() {
    return this.form.controls.name;
  }

  get league() {
    return this.form.controls.league;
  }

  get postCode() {
    return this.form.controls.postCode;
  }

  onInput(_: Event, control: FormControl, maxLength: number) {
    // console.log(`event`, this.clubName.value);
    const content = control.value!;
    if (content.length > maxLength) {
      control.setValue(content.substring(0, maxLength));
    }
  }

  onTeamCreate() {
    const { name, postCode, league } = this.form.value;
    if (this.form.invalid) {
      console.log(`Form not valid - not submitting`);
      return;
    }

    const strippedPostCode = postCode?.toLowerCase().replace(/\s/g, '');
    this.loadingService.loadingStart();

    this.teamService
      .saveTeam({
        name: name?.trim(),
        postCode: strippedPostCode,
        league: league?.trim(),
      } as ITeam)
      .pipe(
        finalize(() => {
          console.log(`Turning the spinner off`);
          this.loadingService.loadingStop();
        }),
      )
      .subscribe({
        next: (team) => {
          console.log(`Team Created`, team);
        },
        complete: () => {
          console.log(`Navigate`);
          this.router.navigate([teamsPath]).then();
        },
        error: (err) => console.log(`There was an error`, err),
      });
  }

  randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
