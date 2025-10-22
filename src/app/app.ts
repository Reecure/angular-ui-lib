import { Component } from '@angular/core';
import { CustomButtonComponent } from '../shared/ui/button/button.component';
import { CustomInputComponent } from '../shared/ui/input/input.component';
import {FormGroup, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ToggleMenuComponent, ToggleMenuOption} from '../shared/ui/toggle-menu/toggle-menu.component';
import {IndicatorStatus, StatusIndicatorComponent} from '../shared/ui/status-indicator/status-indicator.component';
import {LevelIndicatorComponent, LevelIndicatorStatus} from '../shared/ui/level-indicator/level-indicator.component';
import {CustomSelectComponent} from '../shared/ui/select/select.component';
import {ChipsStatus, CustomChipsComponent,} from '../shared/ui/chips/chips.component';
import {CustomCheckboxComponent} from '../shared/ui/checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  imports: [CustomButtonComponent, CustomInputComponent, ReactiveFormsModule, FormsModule, ToggleMenuComponent, StatusIndicatorComponent, LevelIndicatorComponent, CustomSelectComponent, CustomButtonComponent, CustomButtonComponent, CustomChipsComponent, CustomCheckboxComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  myForm: FormGroup;
  isAgreementAccepted = false;
  isSubscribed = false

  constructor() {
    this.myForm = new FormGroup({
      email: new FormControl('', []),
      disabledEmail: new FormControl(
        { value: 'some.email@example.com', disabled: true })
    })
  }

  selectedView = 'list';
  iconOptions: ToggleMenuOption[] = [
    { value: 'date', svgIcon: 'assets/icons/table-header/add-icon.svg' },
    { value: 'list', svgIcon: 'assets/icons/table-header/add-icon.svg' }
  ];

  selectedRule = 'rules';
  textOptions: ToggleMenuOption[] = [
    { value: 'rules', label: 'Правила' },
    { value: 'triggers', label: 'Спрацювання' }
  ];

  selectedMode = 'map';
  mixedOptions: ToggleMenuOption[] = [
    { value: 'map', label: 'Карта', icon: 'pi pi-map-marker' },
    { value: 'list', label: 'Список', icon: 'pi pi-list' },
    { value: 'analytics', label: 'Аналитика', icon: 'pi pi-chart-bar' }
  ];

  userData = {
    name: 'Початкове ім\'я',
    email: '',
  };

  statusOptions = [
    { label: 'Активне', value: 'active', color: IndicatorStatus.GREEN },
    { label: 'Неактивне', value: 'inactive', color: IndicatorStatus.RED }
  ];

  selectedStatuses: string[] = ['active', 'inactive'];

  submitForm() {
    console.log('Дані форми:', this.myForm.value);
    console.log('Ім\'я через ngModel:', this.userData.name);
  }

  protected readonly IndicatorStatus = IndicatorStatus;
  protected readonly LevelIndicatorStatus = LevelIndicatorStatus;
  protected readonly ChipsStatus = ChipsStatus;
}
