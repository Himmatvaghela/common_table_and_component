import { Attribute, Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  toggleSidebar() {
    this.commonService.sidebarToggle = !this.commonService.sidebarToggle;
  }

  ngOnInit(): void {}
}
