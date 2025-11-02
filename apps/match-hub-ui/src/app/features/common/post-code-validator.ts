import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const POSTCODE_CLEANED_REGEX = /^[a-z]{1,2}\d{1,2}[a-z]?\d[a-z]{2}$/;

export function postCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const postCode = control.value!.toLowerCase().replace(/\s/g, '');
    return POSTCODE_CLEANED_REGEX.test(postCode)
      ? null
      : { invalidPostCode: true };
  };
}
