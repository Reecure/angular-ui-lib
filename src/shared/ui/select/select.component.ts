import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  forwardRef,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { CustomButtonComponent } from '../button/button.component';
import { CustomInputComponent } from '../input/input.component';
import { OptionsFilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomButtonComponent,
    CustomInputComponent,
    OptionsFilterPipe,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() placeholder = 'Виберіть...';
  @Input() optionValue = 'value';
  @Input() optionLabel = 'label';
  @Input() itemTemplate?: TemplateRef<any>;

  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() showSelectAllOption = true;
  @Input() displayMode: 'list' | 'count' = 'count';

  @Output() valueChange = new EventEmitter<any[]>();

  isOpen = false;
  filterValue = '';
  private readonly SELECT_ALL_KEY = '__SELECT_ALL__';

  private onChange = (_: any) => {};
  private onTouched = () => {};

  _value: any[] = [];
  get value(): any[] {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
    this.onChange(this._value);
    this.onTouched();
    this.valueChange.emit(this._value);
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  writeValue(value: any): void {
    this.value = value || [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  get selectAllOptionObject(): any {
    return {
      [this.optionLabel]: 'Всі',
      [this.optionValue]: this.SELECT_ALL_KEY,
      _isSelectAll: true,
    };
  }

  isSelected(option: any): boolean {
    return this.value.includes(option[this.optionValue]);
  }

  get allRealOptionsSelected(): boolean {
    if (!this.options || this.options.length === 0) return false;
    return this.options.every((opt) => this.value.includes(opt[this.optionValue]));
  }

  get displayText(): string {
    if (!this.value || this.value.length === 0) {
      return this.placeholder;
    }
    if (this.allRealOptionsSelected) {
      return 'Всі';
    }
    if (this.displayMode === 'count') {
      return `Обрано (${this.value.length})`;
    }
    return this.options
      .filter((opt) => this.value.includes(opt[this.optionValue]))
      .map((opt) => opt[this.optionLabel])
      .join(', ');
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) this.filterValue = '';
  }

  onOptionClick(option: any): void {
    const optionVal = option[this.optionValue];

    if (option._isSelectAll) {
      this.allRealOptionsSelected ? this.clearAll() : this.selectAll();
      return;
    }

    const index = this.value.findIndex((v) => v === optionVal);
    if (index > -1) {
      this.value = this.value.filter((v) => v !== optionVal);
    } else {
      this.value = [...this.value, optionVal];
    }
  }

  selectAll(): void {
    this.value = this.options.map((opt) => opt[this.optionValue]);
  }

  clearAll(): void {
    this.value = [];
  }
}
