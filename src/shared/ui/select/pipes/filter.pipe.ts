import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionsFilter',
  standalone: true,
})
export class OptionsFilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchTerm: string,
    labelKey: string
  ): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    return items.filter(
      (item) =>
        item[labelKey] &&
        item[labelKey]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }
}
