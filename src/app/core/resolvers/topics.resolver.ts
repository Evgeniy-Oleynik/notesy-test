import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Topic } from '../interfaces/topic';
import { inject } from '@angular/core';
import { TopicsService } from '../services/topics.service';

export const topicsResolver: ResolveFn<void> = () => {

  return inject(TopicsService).getAllTopics();
  }
