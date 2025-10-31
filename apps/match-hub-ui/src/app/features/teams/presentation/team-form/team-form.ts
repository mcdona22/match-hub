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
import { max } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { postCodeValidator } from '../../../common/post-code-validator';
import { PostcodeFormatPipe } from '../../../common/postCode.pipe';
import { TeamService } from '../../application/team-service';
import { ITeam } from '../../data/i-team';
import { Router } from '@angular/router';
import { teamsPath } from '../../../../app.routes';

@Component({
  selector: 'app-team-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    JsonPipe,
    PostcodeFormatPipe,
  ],
  templateUrl: './team-form.html',
  styleUrl: './team-form.scss',
})
export class TeamForm {
  readonly minName = 4;
  readonly maxName = 20;

  teamService = inject(TeamService);
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
  });
  protected readonly max = max;

  get name() {
    return this.form.controls.name;
  }

  get postCode() {
    return this.form.controls.postCode;
  }

  onInput(_: Event, maxLength: number) {
    // console.log(`event`, this.clubName.value);
    const content = this.name.value!;
    if (content.length > maxLength) {
      this.name.setValue(content.substring(0, maxLength));
    }
  }

  onTeamCreate() {
    const { name, postCode } = this.form.value;
    if (this.form.invalid) {
      console.log(`Form not valid - not submitting`);
      return;
    }

    const strippedPostCode = postCode?.toLowerCase().replace(/\s/g, '');
    this.teamService
      .saveTeam({
        name,
        postCode: strippedPostCode,
      } as ITeam)
      .subscribe({
        next: (team) => {
          console.log(`Team Created`, team);
        },
        complete: () => {
          console.log(`We are all finished`);
          console.log(`Turn off the spinner`);
          console.log(`Navigate`);
          this.router.navigate([teamsPath]).then();
        },
        error: (err) => console.log(`There was an error`, err),
      });
  }

  randomKey = () =>
    Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}
