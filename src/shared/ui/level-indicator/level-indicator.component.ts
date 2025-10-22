import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

export enum LevelIndicatorStatus {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

@Component({
  selector: 'app-level-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="level-indicator-container" [attr.data-level]="this.level">
    <span>{{ this.level }}</span>
  </div>`,
  styleUrl: './level-indicator.component.scss',
})
export class LevelIndicatorComponent {
  @Input({required: true}) level!: LevelIndicatorStatus;
}
