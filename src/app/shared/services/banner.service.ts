import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  initialized$ = new ReplaySubject;


  set(value: boolean) {
    this.initialized$.next(value);
  }
}
