import { Directive, Input, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCustomValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidationDirective,
      multi: true,
    },
  ],
})
export class CustomValidationDirective implements Validator {
  constructor() {}
  @Input() pattern: any;
  validate(control: AbstractControl): ValidationErrors | null {
    let rezex = new RegExp(this.pattern);
    if (!rezex.test(control.value) && control.value) {
      console.log('check');
      return { wrongPattern: true };
    }
    return null;
  }
}
