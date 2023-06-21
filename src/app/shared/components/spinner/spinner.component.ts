import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { RequestsGetterState } from '../../../core/ngxs/requests/requests-getter.state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Select(RequestsGetterState.getIsLoadingRequest)
  isLoading$: Observable<boolean>;

  constructor() {}
}
