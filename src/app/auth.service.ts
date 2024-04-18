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
    this.tokenService.getRequestWithToken('https://570e-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/type').subscribe((response: any) => {
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
