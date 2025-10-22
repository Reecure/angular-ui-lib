import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

export enum IndicatorStatus {
  GREEN = 'green',
  RED = 'red',
  GRAY = 'gray',
}

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="status-circle" [ngClass]="statusClass"></span>`,
  styleUrls: ['./status-indicator.component.scss'],
})
export class StatusIndicatorComponent {
  @Input({required: true}) status!: IndicatorStatus;

  get statusClass(): string {
    return `status-circle--${this.status}`;
  }
}
