import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isRegisteringSubject = new BehaviorSubject<boolean>(true);
  isRegistering$ = this.isRegisteringSubject.asObservable();

  setIsRegistering(value: boolean): void {
    this.isRegisteringSubject.next(value);
  }
  
  constructor() { }
}
