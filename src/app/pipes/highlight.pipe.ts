import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, searchStr: string = ""): string {
    const newText = value.replace(new RegExp(searchStr, "gi"), (match) => {
      return `<mark>${match}</mark>`;
    });
    return newText;
  }

}
