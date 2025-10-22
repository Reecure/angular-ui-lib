import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class CustomButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'outlined' | 'outlined-gray' = 'primary';
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() style: Record<string, any> | undefined;
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled && this.buttonType !== 'submit') {
      this.clicked.emit();
    }
  }
}
