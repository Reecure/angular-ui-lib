import {Component, Input, Output, EventEmitter, HostBinding, AfterViewInit, ElementRef} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

export type ToggleMenuOption = {
  value: any;
  label?: string;
  svgIcon?: string;
  icon?: string;
};

@Component({
  selector: 'app-toggle-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './toggle-menu.component.html',
  styleUrl: './toggle-menu.component.scss'
})
export class ToggleMenuComponent implements AfterViewInit {
  @Input() options: ToggleMenuOption[] = [];
  @Input() isIcon = false;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) {}

  @HostBinding('class.icon-only')
  get isIconOnly(): boolean {
    return this.isIcon;
  }

  ngAfterViewInit(): void {
    const host = this.elementRef.nativeElement;
    host.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('.p-togglebutton');

      if (button && button.classList.contains('p-togglebutton-checked')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
  }

  onValueChange(newValue: any): void {
    if (newValue === null || newValue === undefined) {
      return;
    }

    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
