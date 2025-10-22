import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let uniqueIdCounter = 0;

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CustomCheckboxComponent implements OnInit {
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() id: string = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  public internalId: string = '';

  ngOnInit(): void {
    this.internalId = this.id || `custom-checkbox-${uniqueIdCounter++}`;
  }

  onValueChange(newValue: boolean): void {
    this.checkedChange.emit(newValue);
  }
}
