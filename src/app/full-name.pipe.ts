import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from "./interfaces";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Patient): string {
    return `${value.lastName} ${value.name} ${value.secondName}`;
  }

}
