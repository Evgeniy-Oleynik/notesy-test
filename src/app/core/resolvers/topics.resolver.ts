import { Injectable } from '@angular/core';
import { Topic } from '../interfaces/topic';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TopicsService } from '../services/topics.service';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { take } from 'rxjs/operators';

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
