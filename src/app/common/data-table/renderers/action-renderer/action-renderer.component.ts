import { Component } from '@angular/core';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrl: './action-renderer.component.css',
})
export class ActionRendererComponent {
  tableApi: any;
  params: any;
  parentComp: string = '';
  cellInit(params: any, tableAPI: any) {
    console.log('action renderer');
    this.tableApi = tableAPI;
    this.params = params;
    if (this.tableApi.parentRef instanceof AppComponent) {
      this.parentComp = 'AppComponent';
    }
  }

  toggleInput(): void {
    this.params.data.isShow = !this.params.data.isShow;
  }
}
