import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  constructor(private el: ElementRef) {}
  @Output() outsideClick = new EventEmitter();
  @HostListener('document:click', ['$event.target'])
  clickOutside(targetElement: Element) {
    let inside = this.el.nativeElement.contains(targetElement);
    if (!inside) {
      this.outsideClick.emit(true);
    }
    console.log('click', this.el.nativeElement);
  }
}
