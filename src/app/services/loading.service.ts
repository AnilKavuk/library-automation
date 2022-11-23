import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoadingBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  startLoading() {
    this.isLoadingBehavior.next(true);
  }

  stopLoading() {
    this.isLoadingBehavior.next(false);
  }
}
