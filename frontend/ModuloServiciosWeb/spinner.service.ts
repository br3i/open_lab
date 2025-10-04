import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
    private spinnerVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    spinnerVisible$ = this.spinnerVisibleSubject.asObservable();
  
    constructor() {}
  
    show(): void {
      this.spinnerVisibleSubject.next(true);
    }
  
    hide(): void {
      this.spinnerVisibleSubject.next(false);
    }
}