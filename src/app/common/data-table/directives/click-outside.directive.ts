import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isenseClickOutside]',
})
export class ClickOutsideDirective implements OnInit {
  @Input() isDivOpen = false;
  @Output() clickedOutside: EventEmitter<void> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.onOutsideClick = this.onClick;
    }, 0);
  }

  // Listen for click events on the whole document
  @HostListener('document:click', ['$event.target'])
  public onOutsideClick = (_targetElement: HTMLElement): void => {};

  public onClick = (_targetElement: HTMLElement): void => {
    if (this.isDivOpen) {
      const clickedInside =
        this.elementRef.nativeElement.contains(_targetElement);
      if (!clickedInside) {
        this.clickedOutside.emit(); // Emit an event if the click was outside the element
      }
    }
  };
}
