import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validator,
  NG_VALIDATORS,
  Validators,
} from '@angular/forms';

import { Directive } from '@angular/core';

@Directive({
  selector: '[isIPv4]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: Ipv4ValidatorDirective,
      multi: true,
    },
  ],
})
export class Ipv4ValidatorDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors {
    return ipv4Validator();
  }
  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }
}

export function ipv4Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validator = Validators.pattern(
      '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
    );
    const result = validator(control);

    return result ? {ipv4: result.pattern} : null;
  };
}
