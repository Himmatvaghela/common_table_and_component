import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[isenseRendererParser]',
})
export class RendererParserDirective implements OnInit {
  @Input() rowParam: any;
  @Input() col: any;
  @Input() api: any;
  @Input() currentValue: any;
  ref: any;
  constructor(private el: ViewContainerRef) {}
  ngOnInit() {
    this.el?.clear();
    this.ref = this.el.createComponent(this.col?.cellRenderer);
    let params: any = {
      data: this.rowParam,
      value: this.currentValue,
      cellParams: this.col?.cellRendererParams,
    };
    this.ref.instance.cellInit(params, this.api);
  }
}
