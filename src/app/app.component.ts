import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public commonService: CommonService) {}
  title = 'custom-agGrid-table';

  outsideClicked(e: any) {
    this.commonService.sidebarToggle = false;
  }
}
