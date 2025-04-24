import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfinitScroll]',
})
export class InfinitScrollDirective {
  constructor() {}
  @Output() scrollEmit = new EventEmitter();
  @HostListener('scroll', ['$event.target'])
  onScroll(target: any) {
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 1) {
      this.scrollEmit.emit();
    }
  }
}
