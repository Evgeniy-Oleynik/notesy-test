import { AbstractControl, ValidatorFn } from '@angular/forms';

export function inputsNotEqual(input1, input2): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
      const firstControl = control.get(input1);
      const secondControl = control.get(input2);
      if (secondControl.value && (firstControl.value !== secondControl.value)) {
        secondControl.setErrors({notequal: true});
        return {notequal: true};
      } else {
        return null;
      }
    }
  }

