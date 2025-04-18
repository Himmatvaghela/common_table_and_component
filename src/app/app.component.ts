import { Component } from '@angular/core';
import { TagsRendererComponent } from './common/data-table/renderers/tags-renderer/tags-renderer.component';
import { ActionRendererComponent } from './common/data-table/renderers/action-renderer/action-renderer.component';
import { FormControl } from '@angular/forms';

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
  dropdownConfig = {
    label: 'Datalake:',
    searchRequired: true,
    placeholder: '',
    chipLimit: 1,
    selectAll: false,
    required: false,
  };
  dataLakeList: any[] = ['ram', 'shyam', 'rahul', 'ajay'];
  selectedDataLake: any[] = [];

  selectionValue(value: any) {
    this.selectedDataLake = value;
  }

  //single selct use///////////////
  name: any;
  assignedGroup = new FormControl('');
  assignedGroupList: any[] = ['shyam', 'ram'];
  //.................................
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
    { headerName: 'Action', fieldName: 'Action' },
  ];

  rowData: any[] = [];

  ngOnInit(): void {
    this.setColdefs();
    this.rowData = [
      {
        id: 'IID_000#',
        action_type: 'Ticket',
        tools: 'ITSM',
        status: 'New',
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
  }

  onPaginationChange(event: any) {
    this.pageNo = event.page;
    this.pageSize = event.pageSize;
    // this.getAlarmActionListTable();
  }

  setColdefs() {
    for (let i = 0; i < this.colDefs.length; i++) {
      if (this.colDefs[i].fieldName == 'action_type') {
        console.log('coming in action_type', this.colDefs);
        this.colDefs[i] = {
          ...this.colDefs[i],
          cellRendererParams: { name: 'blue-text' },
          cellRenderer: TagsRendererComponent,
        };
      } else if (this.colDefs[i].fieldName == 'status') {
        this.colDefs[i] = {
          ...this.colDefs[i],
          cellRendererParams: { name: 'multi-color-text' },
          cellRenderer: TagsRendererComponent,
        };
      } else if (this.colDefs[i].fieldName == 'Action') {
        this.colDefs[i] = {
          ...this.colDefs[i],
          cellRenderer: ActionRendererComponent,
        };
      }
    }
  }
}
