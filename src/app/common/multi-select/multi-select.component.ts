import { CommonModule } from '@angular/common';
// import { allIcons } from 'angular-feather/icons';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const noop = () => {};
export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true,
};
export const DROPDOWN_CONTROL_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true,
};

export interface dropdownConfig {
  placeholder: string;
  searchRequired: boolean;
  chipLimit: number;
  label: string;
  selectAll: boolean;
  required: boolean;
}
@Component({
  selector: 'isense-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // FeatherModule.pick(allIcons),
    FeatherModule,
    AlertModule,
    TooltipModule,
    PopoverModule,
    TooltipModule,
    BsDatepickerModule,
  ],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    DROPDOWN_CONTROL_VALUE_ACCESSOR,
    DROPDOWN_CONTROL_VALUE_VALIDATOR,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent
  implements OnChanges, OnInit, ControlValueAccessor
{
  @Input() optionList: any[] = [];
  @Input() iconTemplate: any;
  //this is format of data or we will format here if you don't send like this
  @Input() config: {
    idField: string;
    textField: string;
    disabledField: string;
  } = {
    idField: 'id',
    textField: 'name',
    disabledField: 'isDisabled',
  };
  @Input() dropdownConfig: dropdownConfig = {
    placeholder: 'Select Option',
    label: '',
    searchRequired: false,
    chipLimit: 1,
    selectAll: false,
    required: false,
  };

  @Input() selectedOptions: any[] = [];

  @Output() onSelection = new EventEmitter();
  @Output() onDeSelection = new EventEmitter();
  @Output() onSelectionAll = new EventEmitter();
  @Output() onDeSelectionAll = new EventEmitter();
  @Output() onCurrentSelection = new EventEmitter();

  control!: FormControl<any>;

  showDropdown = false;
  isListArrayOfObject = false;
  isSelectedAll = false;
  inValid: boolean = false;
  searchStr: string = '';
  appUrl = '';
  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}

  // These lifecycle hooks will be in use for further implementation
  ngOnInit(): void {}
  ngOnChanges(_changes: SimpleChanges): void {
    if (
      _changes['optionList'].currentValue &&
      _changes['optionList'].currentValue.length > 0
    ) {
      if (
        typeof this.optionList[0] === 'string' ||
        typeof this.optionList[0] === 'number'
      ) {
        this.optionList = this.optionList.map((option: any) => {
          return {
            [this.config.idField]: option,
            [this.config.textField]: option,
            isSelected: false,
            [this.config.disabledField]: false,
          };
        });
      } else {
        this.isListArrayOfObject = true;
        this.optionList = this.optionList.map((option: any) => {
          return {
            ...option,
            isSelected: false,
          };
        });
      }
      this.writeValue(this.control?.value);
    }
  }

  /**
   * @description Method to toggle dropdown list
   * @author Ankit Tyagi
   */
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  /**
   * @description Method to check if provide arg is an object or not
   * @author Ankit Tyagi
   * @param Obj:any
   * @returns boolean
   */
  isObjEmpty(obj: any): boolean {
    return !(obj && Object.keys(obj).length > 0);
  }

  /**
   * @description Method is to update selected option and then
   * update formcontrol by call onChangeCallback.
   * @author Ankit Tyagi
   * @param item
   * @returns void
   */
  updateSelectedOption(item: any): void {
    item.isSelected = !item.isSelected;
    if (!item.isSelected) {
      let ind = this.selectedOptions.findIndex(
        (option: any) =>
          item[this.config.idField] == option[this.config.idField]
      );
      if (ind >= 0) {
        let itm = this.selectedOptions.splice(ind, 1);
        this.onDeSelection.emit(itm[0]);
      }
    } else {
      this.onCurrentSelection.emit(item);
      this.selectedOptions.push(item);
    }
    this.isSelectedAll = this.optionList.every(
      (option: any) => option.isSelected == true
    );

    this.inValid = false;
    this.onChangeCallback(this.selectedOptions);
    this.onSelection.emit(this.selectedOptions);
    this.cd.markForCheck();
  }

  // Below Methods are used to register form API methods in these variable to use them later
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  validate(control: FormControl): void {
    this.control = control;
  }

  // Below are the CVA interface methods to make this component able to bind with formcontrol in parent component

  /**
   * @description method to update value of selectedOption
   * @author Ankit Tyagi
   * @param controlValue this is provided by formcontrol
   * @returns void
   */
  writeValue(controlValue: any[]): void {
    if (this.optionList.length) {
      this.selectedOptions = [];
      if (controlValue && controlValue.length > 0) {
        if (
          typeof controlValue[0] === 'string' ||
          typeof controlValue[0] === 'number'
        ) {
          controlValue = controlValue.map((option: string | number) => {
            return {
              [this.config.idField]: option,
              [this.config.textField]: option,
            };
          });
        }
        for (const option of controlValue) {
          let ind = this.optionList.findIndex(
            (item: any) =>
              item[this.config.idField] == option[this.config.idField] ||
              item[this.config.textField] == option[this.config.textField]
          );
          if (ind >= 0) {
            this.optionList[ind] = {
              ...this.optionList[ind],
              isSelected: true,
            };
            this.selectedOptions.push(this.optionList[ind]);
          }
        }
      }
      this.isSelectedAll = this.optionList.every(
        (option: any) => option.isSelected == true
      );
      this.onChangeCallback(this.selectedOptions);
      this.cd.markForCheck();
    }
  }

  /**
   * @description method to register on change callback from form API
   * @author Ankit Tyagi
   * @param fn
   * @returns void
   */
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /**
   * @description method to register on touch callback from form API
   * @author Ankit Tyagi
   * @param fn
   * @returns void
   */
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  //willbe used in further implementation
  setDisabledState(_isDisabled: boolean): void {}

  /**
   * @description method to update ontouchcallback on blur
   * @author Ankit Tyagi
   */
  @HostListener('blur')
  public onTouched() {
    this.onTouchedCallback();
  }

  /**
   * @description method to toggle dropdown on outside click
   * @author Ankit Tyagi
   */
  @HostListener('document:click', ['$event'])
  public closeDropdown(event: any) {
    if (!this.el.nativeElement.contains(event.target)) {
      if (this.showDropdown && this.dropdownConfig.required) {
        this.inValid = this.selectedOptions.length < 0;
      }
      this.showDropdown = false;
    }
  }

  checkUncheckAll(): void {
    if (this.isSelectedAll) {
      this.optionList = this.optionList.map((option: any) => {
        return { ...option, isSelected: false };
      });
      this.isSelectedAll = false;
      this.selectedOptions = [];
      this.onDeSelectionAll.emit([]);
    } else {
      this.optionList = this.optionList.map((option: any) => {
        return { ...option, isSelected: true };
      });
      this.isSelectedAll = true;
      this.selectedOptions = [...this.optionList];
      this.onSelectionAll.emit(this.selectedOptions);
    }

    this.onChangeCallback(this.selectedOptions);
    this.onSelection.emit(this.selectedOptions);
  }
}
