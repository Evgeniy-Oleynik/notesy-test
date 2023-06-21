import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formControlError'})
export class FormControlErrorPipe implements PipeTransform {

  transform(controlError: {[key: string]: boolean}, controlName: string,  errorList: {[key: string]: string}): string[] {
    const errorKeys = Object.keys(controlError);
    return errorKeys.map(key => controlName + ' ' + errorList[key]);
  }
}
