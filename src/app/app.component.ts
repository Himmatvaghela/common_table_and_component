import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'custom-agGrid-table';

  tableOptions: any = {
    parentRef: this,
  };

  // @Input() alarmIdDetails;

  pageNo: number = 0;
  pageSize: number = 10;
  totalRecords: number = 0;

  colDefs: any = [
    { headerName: 'Action ID', fieldName: 'id' },
    { headerName: 'Action Type', fieldName: 'action_type' },
    { headerName: 'Tools', fieldName: 'tools' },
    { headerName: 'Status', fieldName: 'status' },
    { headerName: 'Type', fieldName: 'type' },
    { headerName: 'Test', fieldName: 'test' },
    { headerName: 'Check', fieldName: 'check' },
    { headerName: 'Option', fieldName: 'option' },
    { headerName: 'one', fieldName: 'one' },
    { headerName: 'two', fieldName: 'two' },
    { headerName: 'three', fieldName: 'three' },
    { headerName: 'four', fieldName: 'four' },
    { headerName: 'five', fieldName: 'five' },
  ];

  rowData: any[] = [
    {
      id: 'IID_000#',
      action_type: 'Ticket',
      tools: 'ITSM',
      status: 'Open',
      type: 'IID_000#',
      test: 'Ticket',
      check: 'ITSM',
      option: 'Open',
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
    },
    {
      id: 'IID_000#',
      action_type: 'Ticket',
      tools: 'ITSM',
      status: 'In Progress',
      type: 'IID_000#',
      test: 'Ticket',
      check: 'ITSM',
      option: 'Open',
    },
    {
      id: 'IID_000#',
      action_type: 'Ticket',
      tools: 'ITSM',
      status: 'Resolved',
      type: 'IID_000#',
      test: 'Ticket',
      check: 'ITSM',
      option: 'Open',
    },
    {
      id: 'IID_000#',
      action_type: 'Ticket',
      tools: 'ITSM',
      status: 'Open',
      type: 'IID_000#',
      test: 'Ticket',
      check: 'ITSM',
      option: 'Open',
    },
  ];

  ngOnInit(): void {}

  onPaginationChange(event: any) {
    this.pageNo = event.page;
    this.pageSize = event.pageSize;
    // this.getAlarmActionListTable();
  }
}
