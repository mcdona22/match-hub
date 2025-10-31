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
import { postCodeValidator } from '../../../global/post-code-validator';
import { PostcodeFormatPipe } from '../../../global/postCode.pipe';

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

    console.log(`Values`, name, postCode);
  }
}
