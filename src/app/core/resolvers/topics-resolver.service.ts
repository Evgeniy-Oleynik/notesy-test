import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IRequest } from 'ngxs-requests-plugin';
import { TopicsService } from '../services/topics.service';

@Injectable({providedIn: 'root'})
export class TopicsResolver implements Resolve<IRequest> {
  constructor(private topicsService: TopicsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.topicsService.getAllTopics();
    return this.topicsService.getTopicsRequestState$.pipe(
      filter(res => res.loaded),
      take(1)
    )
  }
}
