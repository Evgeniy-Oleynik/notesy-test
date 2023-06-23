import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { TopicsService } from '../services/topics.service';

@Injectable({providedIn: 'root'})
export class TopicsResolver implements Resolve<IRequest> {
  constructor(private topicsService: TopicsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    return this.topicsService.getAllTopics().pipe(
      filter(res => res.loaded && !res.loading),
      take(1)
    );
  }
}
