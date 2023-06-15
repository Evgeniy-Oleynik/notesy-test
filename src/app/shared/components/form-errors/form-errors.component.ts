import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
  @Input() control: FormControl;
  @Input() errors: { [key: string]: string; };
  @Input() submitted: boolean;

  get errorMessages() {
    if(this.control?.errors) {
      return Object.keys(this.control.errors)
      .map((key) => this.errors?.[key] || this.control.errors[key]);
    }
    return [];
  }
}
