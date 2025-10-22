import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export enum ChipsStatus {
  GREEN = 'green',
  RED = 'red',
  YELLOW = 'yellow',
  GRAY = 'gray',
}

@Component({
  selector: 'app-custom-chips',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<span class="status-chips" [ngClass]="statusClass">{{label}}</span>`,
  styleUrls: ['./chips.component.scss'],
})
export class CustomChipsComponent {
  @Input({required: true}) status!: ChipsStatus;
  @Input({required: true}) label!: string;

  get statusClass(): string {
    return `status-chips--${this.status}`;
  }
}
