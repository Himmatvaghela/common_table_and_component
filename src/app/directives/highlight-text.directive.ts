import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightText]',
})
export class HighlightTextDirective implements OnChanges {
  constructor(private el: ElementRef) {}
  @Input() search: any = '';

  ngOnChanges(changes: SimpleChanges): void {
    let value = this.el.nativeElement.textContent;
    this.el.nativeElement.innerHTML = this.highlightText(value, this.search);
  }
  highlightText(text: string, search: string): string {
    if (!search.trim()) return text;
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex
    const re = new RegExp(escapedSearch, 'gi');

    return text.replace(
      re,
      (match) =>
        `<mark styles="background:red !important;" class='highlight'>${match}</mark>`
    );
  }
}
