import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAttribute]',
})
export class AttributeDirective {
  constructor() {}

  @HostBinding('style.color') color = 'red';
}
