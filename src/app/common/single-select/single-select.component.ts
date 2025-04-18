import { CommonModule } from '@angular/common';
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
} from '@angular/forms';
import { FeatherModule } from 'angular-feather';

const noop = () => {};
export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SingleSelectComponent),
  multi: true,
};
export const DROPDOWN_CONTROL_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SingleSelectComponent),
  multi: true,
};

@Component({
  selector: 'isense-single-select',
  standalone: true,
  imports: [CommonModule, FeatherModule, FormsModule],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SingleSelectComponent,
      multi: true,
    },
    DROPDOWN_CONTROL_VALUE_VALIDATOR,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  appUrl: string = '';
  searchStr = '';
  @Input() optionList: any[] = [];
  @Input() iconTemplate: any;
  @Input() config: {
    idField: string;
    textField: string;
    disabledField: string;
  } = {
    idField: 'id',
    textField: 'name',
    disabledField: 'isDisabled',
  };
  @Input() placeholder = 'Select Option';
  @Input() searchRequired = false;
  @Input() selectedOption: any;

  @Output() onSelection = new EventEmitter();

  showDropdown = false;
  @Input() isRequired: boolean = false;
  @Input() label: string = '';

  inValid: boolean = false;
  control!: FormControl<any>;
  disableControl: boolean = false;
  @Output() onScroll: any = new EventEmitter();

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}

  // These lifecycle hooks will be in use for further implementation
  ngOnInit(): void {}
  ngOnChanges(_changes: SimpleChanges): void {
    if (!_changes['optionList']?.currentValue) {
      this.optionList = [];
    } else {
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
    if (typeof obj == 'string' || typeof obj == 'number') return true;
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
    this.selectedOption = item;
    this.toggleDropdown();
    this.inValid = false;
    this.onChangeCallback(item);
    this.onSelection.emit(item);
  }

  validate(control: FormControl): void {
    this.control = control;
  }

  // Below Methods are used to register form API methods in these variable to use them later
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // Below are the CVA interface methods to make this component able to bind with formcontrol in parent component

  /**
   * @description method to update value of selectedOption
   * @author Ankit Tyagi
   * @param obj this is provided by formcontrol
   * @returns void
   */
  writeValue(obj: any): void {
    this.selectedOption = '';

    if (this.optionList.length && obj) {
      if (typeof obj === 'string' || typeof obj === 'number') {
        if (
          typeof this.optionList?.[0] === 'string' ||
          typeof this.optionList?.[0] === 'number'
        ) {
          if (this.optionList.includes(obj)) {
            this.selectedOption = obj;
          }
        } else if (obj != '') {
          for (const option of this.optionList) {
            if (
              option[this.config.idField] == obj ||
              option[this.config.textField] == obj
            ) {
              this.selectedOption = option;
              break;
            }
          }
        }
      } else {
        if (
          obj?.hasOwnProperty(this.config.idField) &&
          !this.isObjEmpty(this.optionList[0])
        ) {
          for (const option of this.optionList) {
            if (option[this.config.idField] == obj[this.config.idField]) {
              this.selectedOption = option;
              break;
            }
          }
        }
      }
      setTimeout(() => {
        this.onChangeCallback(this.selectedOption);
      }, 0);
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
  setDisabledState(isDisabled: boolean): void {
    this.disableControl = isDisabled;
  }

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
      if (this.showDropdown && this.isRequired) {
        this.inValid =
          this.selectedOption == '' ||
          JSON.stringify(this.selectedOption) == '{}';
      }
      this.showDropdown = false;
    }
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
      this.optionList.length
    ) {
      this.onScroll.emit();
    }
  }
}
