import { Component } from '@angular/core';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-tags-renderer',
  templateUrl: './tags-renderer.component.html',
  styleUrl: './tags-renderer.component.css',
})
export class TagsRendererComponent {
  toolTipContent: string = `<h1>Hi Ashu I am html</h1>`;

  listOfItems: any[] = [];
  indexOfColumn: any;
  nameOfColumn!: string;
  numberOfItem: number = 2;

  cellInit(params: any, tableApi: any) {
    if (tableApi.parentRef instanceof AppComponent) {
      if (params.cellParams.name == 'blue-text') {
        this.nameOfColumn = 'blue-text';

        if (params.cellParams.cellName == 'action_type') {
          this.listOfItems = params.value;
        } else {
          this.listOfItems.push(params.value);
        }
      }

      if (params.cellParams.name == 'multi-color-text') {
        this.nameOfColumn = 'multi-color-text';

        if (params.cellParams.cellName == 'status') {
          this.listOfItems = params.value;
        }
        this.listOfItems.push(params.value);
      }
    }
    // else if (tableApi.parentRef instanceof AlarmIncidentComponent) {
    //   if (params.cellParams.name == 'multi-color-text') {
    //     this.nameOfColumn = 'multi-color-text';

    //     if (params.cellParams.cellName == 'status') {
    //       this.listOfItems = params.value;
    //     }
    //     this.listOfItems.push(params.value);
    //   }
    // }
    this.indexOfColumn = this.returnIndex(this.nameOfColumn);
  }
  getColorClass(item: string): string {
    const columnConfig = this.colorCodeArray.find(
      (col: any) => col.columnName === 'multi-color-text'
    );

    if (columnConfig) {
      if (item === 'New') return 'yellow';
      if (item === 'Open') return 'yellow';
      if (item === 'In Progress') return 'blue';
      if (item === 'Resolved') return 'green';

      const colorObj = columnConfig.colorCodes.find(
        (c: any) => c.value === item
      );
      return colorObj ? colorObj.color : '';
    }
    return '';
  }

  //dummy data
  colorCodeArray: any = [
    {
      columnName: 'multi-color-text',
      colorCodes: [{ color: 'blue' }, { color: 'green' }, { color: 'yellow' }],
    },
    {
      columnName: 'blue-text',
      colorCodes: [{ color: 'blue' }],
    },
  ];

  returnIndex(columnName: string): number {
    return this.colorCodeArray.findIndex(
      (e: any) => e.columnName === columnName
    );
  }
}
