import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private tokenService: TokenService) {
    this.initAuth();
  }

  private initAuth(): void {
    this.tokenService.getRequestWithToken('http://127.0.0.1:8000/api/type').subscribe((response: any) => {
      console.log(response)
      if (response === 'admin') {
        console.log( "aqu000")
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  public isAuth(): boolean {
    console.log(this.isAuthenticatedSubject.getValue())
    return this.isAuthenticatedSubject.getValue();
  }
}
