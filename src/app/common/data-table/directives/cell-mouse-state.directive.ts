import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isenseCellMouseState]',
})
export class CellMouseStateDirective {
  @Input() colData: any;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.colData.showMouseEventEffect) {
      this.renderer.addClass(this.el?.nativeElement, 'active-cell');
    }
  }

  @HostListener('mouseover')
  onMouseOver(): void {
    if (this.colData.showMouseEventEffect) {
      this.renderer.addClass(this.el?.nativeElement, 'active-cell');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.colData.showMouseEventEffect) {
      this.renderer.removeClass(this.el?.nativeElement, 'active-cell');
    }
  }
}
