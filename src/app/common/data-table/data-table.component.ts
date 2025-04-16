import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { RendererParserDirective } from '../../directives/renderer-parser.directive';
import { CellMouseStateDirective } from '../../directives/cell-mouse-state.directive';
import { FeatherModule } from 'angular-feather';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FeatherModule,
    FormsModule,
    ClickOutsideDirective,
    RendererParserDirective,
    CellMouseStateDirective,
  ],
  providers: [TitleCasePipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit, OnChanges {
  object = Object;
  @Input() tableOptions: any = {};
  @Input() totalRecords: number = 0;
  @Input() sortingRequired = false;
  @Input() paginationRequired = true;
  @Input() settingsRequired = false;
  @Input() settingsClicked = false;
  @Input() checkBoxSelection = false;
  @Input() checkboxSelectionType = 'multiple';
  @Input() rowData: any[] = [];
  @Input() colDefs: any[] = [];
  @Input() groupByTable: string = '';
  @Input() isRowDraggable = false;
  @Input() RowDraggType = 'multiple';
  @Input() source: any;
  @Output() onPaginationChange = new EventEmitter();
  @Output() onCheckboxSelection = new EventEmitter();
  @Output() onScroll: any = new EventEmitter();
  @Output() onHideSettings: any = new EventEmitter();

  pageDetails: any = {
    pageSize: 10,
    totalPages: 1,
    currentPage: 1,
  };
  recordsToShow: any = {
    min: 0,
    max: 10,
  };
  sortingColumnIndex: any;
  sortingType: string = '';
  selectedRow: any[] = [];
  appUrl: string = '';
  groupData: any[] = [];
  showLoadingData: boolean = false;

  ngOnInit(): void {
    // this.appUrl = environment.control_panel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colDefs']?.currentValue) {
      this.resetTableConfig();
      this.colDefs = changes['colDefs']?.currentValue.map(
        (col: any, i: number) => {
          col.colId = `col_${i}`;
          if (!col.hasOwnProperty('active')) {
            col.active = true;
          }
          // col.active = true;
          return col;
        }
      );
    }
    if (changes['totalRecords']?.currentValue >= 0) {
      this.setPageCount();
    }
    if (changes['rowData']?.currentValue) {
      this.selectedRow = [];
      const data = changes['rowData']?.currentValue || [];
      data.forEach((row: any, i: number) => {
        row.rowId = `${Date.now()}_${i}`;
        if (row?.isSelected) this.selectedRow.push(row);
        return row;
      });
      this.rowData = data;
      if (this.groupByTable) {
        this.setGroupData();
      }
    }
    if (changes['groupByTable']?.currentValue && this.rowData.length > 0) {
      this.setGroupData();
    }
  }

  setGroupData(): void {
    this.groupData = this.rowData.reduce((prevVal: any, currVal: any) => {
      if (prevVal?.[currVal[this.groupByTable]]) {
        prevVal[currVal[this.groupByTable]].push(currVal);
      } else {
        prevVal[currVal[this.groupByTable]] = [currVal];
      }
      return prevVal;
    }, {});
    this.groupData = Object.keys(this.groupData).map((key: any) => {
      return {
        key: key,
        isCollapsed: true,
        rows: this.groupData[key],
      };
    });
  }

  /**
   * @description Method to parse column value from rowdata object
   *  according to given field value in column Defination
   * @author Ankit Tyagi
   * @param row - current row object
   * @param toParse - field value
   * @returns string
   */
  parseColValue(row: any, toParse: string): string {
    if (!toParse?.includes('.')) {
      return row[toParse];
    } else {
      let toParseArr = toParse.split('.');
      let val = row;
      for (const key of toParseArr) {
        val = val[key];
      }
      return val;
    }
  }

  /**
   * @description method to reset table configuration
   * @author Ankit Tyagi
   * @param none
   * @returns void
   */
  resetTableConfig(): void {
    this.pageDetails.pageSize = 10;
    this.pageDetails.currentPage = 1;
    this.pageDetails.totalPages = 1;
    this.recordsToShow.min = 0;
    this.recordsToShow.max = 10;
    this.setPageCount();
  }

  /**
   * @description method to set total pages count
   * @author Ankit Tyagi
   * @param none
   * @returns void
   */
  setPageCount(): void {
    if (this.totalRecords == 0) {
      this.pageDetails.totalPages = 1;
      return;
    }
    if (this.totalRecords && this.totalRecords > 0)
      this.pageDetails.totalPages = Math.ceil(
        this.totalRecords / this.pageDetails.pageSize
      );
  }

  /**
   * @description method to update table on page size change
   * @author Ankit Tyagi
   * @param event
   * @returns void
   */
  onPageSizeChanged(event: any): void {
    this.recordsToShow.min = 0;
    this.recordsToShow.max = parseInt(event.target.value);
    this.pageDetails.currentPage = 1;
    this.pageDetails.pageSize = parseInt(event.target.value);
    this.setPageCount();
    this.onPaginationChange.emit({
      page: this.pageDetails.currentPage - 1,
      pageSize: this.pageDetails.pageSize,
    });
  }

  /**
   * @description method to update table on previous button click
   * @author Ankit Tyagi
   */
  onBtPrevClick(): void {
    this.recordsToShow.min = this.recordsToShow.min - this.pageDetails.pageSize;
    this.recordsToShow.max = this.recordsToShow.max - this.pageDetails.pageSize;
    if (this.pageDetails.currentPage > 1)
      this.pageDetails.currentPage = this.pageDetails.currentPage - 1;

    this.onPaginationChange.emit({
      page: this.pageDetails.currentPage - 1,
      pageSize: this.pageDetails.pageSize,
    });
  }

  /**
   * @description method to update table on next button click
   * @author Ankit Tyagi
   */
  onBtNextClick(): void {
    this.recordsToShow.min = this.recordsToShow.min + this.pageDetails.pageSize;
    this.recordsToShow.max = this.recordsToShow.max + this.pageDetails.pageSize;

    if (this.pageDetails.currentPage < this.pageDetails.totalPages)
      this.pageDetails.currentPage = this.pageDetails.currentPage + 1;

    this.onPaginationChange.emit({
      page: this.pageDetails.currentPage - 1,
      pageSize: this.pageDetails.pageSize,
    });
  }

  /**
   * @description method to update table on selecting any page randomly
   * @author Ankit Tyagi
   * @param event
   */
  goToSelectedPage(event: any): void {
    let pageNo = event.target.value;
    if (pageNo < 1) {
      this.pageDetails.currentPage = 1;
    } else if (pageNo > this.pageDetails.totalPages) {
      this.pageDetails.currentPage = this.pageDetails.totalPages;
    }
    this.recordsToShow.max =
      this.pageDetails.currentPage * this.pageDetails.pageSize;
    this.recordsToShow.min =
      this.pageDetails.currentPage * this.pageDetails.pageSize -
      this.pageDetails.pageSize;

    this.onPaginationChange.emit({
      page: this.pageDetails.currentPage - 1,
      pageSize: this.pageDetails.pageSize,
    });
  }

  /**
   * @description method to sort data according to type and column
   * @author Ankit Tyagi
   * @param sortingColumIndex
   * @param fieldName
   * @param sortingType
   */
  onSortingRowData(
    sortingColumIndex: number,
    fieldName: string,
    sortingType: string
  ): void {
    this.sortingColumnIndex = sortingColumIndex;
    this.sortingType = sortingType;
    if (sortingType == 'asc') {
      this.ascendingOrder(fieldName);
    } else {
      this.descendingOrder(fieldName);
    }
  }

  /**
   * @description method to sort table in ascending order according to given field
   * @param fieldName
   */
  ascendingOrder(fieldName: string): void {
    this.rowData = this.rowData.sort((a, b) => {
      if (this.parseColValue(a, fieldName) > this.parseColValue(b, fieldName)) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  /**
   * @description method to sort table in descending order according to given field
   * @param fieldName
   */
  descendingOrder(fieldName: string): void {
    this.rowData = this.rowData.sort((a, b) => {
      if (this.parseColValue(a, fieldName) > this.parseColValue(b, fieldName)) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  /**
   * @description method to check/uncheck all rows on header checkbox selection/deselection
   * @author Ankit Tyagi
   * @param event
   */
  onHeaderCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.rowData = this.rowData.map((data) => {
        data.isSelected = true;
        return data;
      });
      this.selectedRow = JSON.parse(JSON.stringify(this.rowData));
      this.onCheckboxSelection.emit(this.rowData);
    } else {
      this.rowData = this.rowData.map((data) => {
        data.isSelected = false;
        return data;
      });
      this.selectedRow = [];
      this.onCheckboxSelection.emit([]);
    }
  }

  /**
   * @description method to check/uncheck row on row checkbox selection/deselection
   * @author Ankit Tyagi
   * @param event
   */
  onRowCheckboxSelection(event: any): void {
    if (event.target.checked) {
      let ind = this.rowData.findIndex(
        (item: any) => item.rowId == event.target.id
      );
      this.rowData[ind].isSelected = true;
      if (
        this.checkboxSelectionType != 'multiple' &&
        this.selectedRow.length > 0
      ) {
        (
          document.getElementById(this.selectedRow[0].rowId) as HTMLInputElement
        ).checked = false;
        this.selectedRow = [];
      }
      this.selectedRow.push(this.rowData[ind]);

      this.onCheckboxSelection.emit(this.selectedRow);
    } else {
      let ind = this.rowData.findIndex(
        (item: any) => item.rowId == event.target.id
      );
      this.rowData[ind].isSelected = false;
      let i = this.selectedRow.findIndex(
        (item: any) => item.rowId == event.target.id
      );
      this.selectedRow.splice(i, 1);
      this.onCheckboxSelection.emit(this.selectedRow);
    }
  }

  checkAllSelected(): boolean {
    return (
      this.rowData.length > 0 &&
      this.rowData.every((data: any) => data.isSelected)
    );
  }
  /**
   * @description method to check/uncheck all rows on header checkbox selection/deselection
   * @author Ankit Tyagi
   * @param col
   * @returns {object}
   */
  getStyle(col: any): object {
    return { width: `${col.width}px` };
  }

  //code for column dragging

  //key used for updating column on which dragged column is hovering
  dragIndex: any;

  /**
   * @description method to set data on drag start of any column
   * @author Ankit Tyagi
   * @param event
   * @param col
   */
  columnDragStart(event: DragEvent, col: any): void {
    event.dataTransfer?.setData('columnId', col.colId);
  }

  /**
   * @description method to update dragIndex on entering any column area
   * @author Ankit Tyagi
   * @param _event
   * @param i
   */
  columnDragEnter(_event: any, i: number): void {
    this.dragIndex = i;
  }
  /**
   * @description method to update dragIndex on hovering any column area
   * @author Ankit Tyagi
   * @param _event
   * @param i
   */
  columnDragOver(event: any, i: number): void {
    //this is necessary for preventing unusual behaviour.
    event.preventDefault();
    this.dragIndex = i;
  }

  /**
   * @description method to update dragIndex on leaving any column area
   * @author Ankit Tyagi
   * @param _event
   * @param i
   */
  columnDragLeave(_event: any, _i: number): void {
    this.dragIndex = null;
  }

  /**
   * @description method to update dragIndex on dropping in any column area
   * also swapping columns to update table view
   * @author Ankit Tyagi
   * @param _event
   * @param i
   */
  onColumnDrop(e: DragEvent, i: number) {
    //to prevent unusual behaviour
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    this.dragIndex = null;
    let colId = e.dataTransfer?.getData('columnId');
    let ind = this.colDefs.findIndex((col: any) => col.colId == colId);
    const column = this.colDefs[ind];
    this.colDefs[ind] = this.colDefs[i];
    this.colDefs[i] = column;
  }

  /**
   * @description method to load more list
   * @author Ankit Tyagi
   * @param event
   */
  onDivScroll(event: any): void {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
        event.target.scrollHeight - 1 &&
      this.rowData.length
    ) {
      this.onScroll.emit();
    }
  }

  hideSettings(): void {
    this.settingsClicked = false;
    this.onHideSettings.emit(this.settingsClicked);
  }

  // code for single and custom row

  onRowDrag(e: any, _row: any): void {
    if (this.RowDraggType == 'multiple') {
      e.dataTransfer?.setData('draggedData', JSON.stringify(this.selectedRow));
    } else {
      e.dataTransfer?.setData('draggedData', JSON.stringify([_row]));
    }
  }

  showLoadingNoData() {
    this.showLoadingData = true;
  }
}
