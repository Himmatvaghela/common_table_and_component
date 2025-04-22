import { Component } from '@angular/core';
import { HomeComponent } from '../../../../pages/home/home.component';

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
    if (this.tableApi.parentRef instanceof HomeComponent) {
      this.parentComp = 'HomeComponent';
    }
  }

  toggleInput(): void {
    this.params.data.isShow = !this.params.data.isShow;
  }
}
