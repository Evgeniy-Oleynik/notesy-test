import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
  @Input() control: FormControl;
  @Input() controlName: string;

  ERRORS: {[key: string]: string} = {
    'required': 'is required',
    'minlength': 'is too short',
    'maxlength': 'is too long',
    'email': 'is invalid',
    'notequal': 'is different',
  }
}
