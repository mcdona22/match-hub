import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { postCodeValidator } from './post-code-validator';

fdescribe('PostCodeValidator', () => {
  let validator: ValidatorFn;
  beforeEach(() => {
    validator = postCodeValidator();
  });
  describe('should validate the 4 types of valid postcode', () => {
    const postCodes = [
      {
        postCode: 'hd1 2fs',
        kind: 'simple',
      },
      { postCode: 'S15cg', kind: 'large city' },
      { postCode: 'w1a 5bg', kind: 'long' },
      { postCode: 'ec1a 7js', kind: 'longest' },
    ];
    for (const postCode of postCodes) {
      it(`should validate ${postCode.kind} post codes. eg, ${postCode.postCode}`, () => {
        const validator = postCodeValidator();

        const control = new FormControl(postCode.postCode) as AbstractControl;
        expect(validator(control))
          .withContext(`${postCode.postCode} failed`)
          .toBeNull();
      });
    }
  });

  describe('Spaces and casing', () => {
    const postCodes = [
      { postCode: ' S15CG', kind: 'leading space' },
      { postCode: 'S15 CG', kind: 'embedded space' },
      { postCode: 'S15 CG ', kind: 'trailing space' },
      { postCode: 'S15CG', kind: 'no space' },
      { postCode: 's1 5kk', kind: 'mixed case' },
    ];

    for (const postCode of postCodes) {
      it(`should validate ${postCode.kind} post codes. eg, '${postCode.postCode}'`, () => {
        const validator = postCodeValidator();

        const control = new FormControl(postCode.postCode) as AbstractControl;
        expect(validator(control))
          .withContext(`${postCode.postCode} failed`)
          .toBeNull();
      });
    }
  });
});
