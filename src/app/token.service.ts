import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isRegisteringSubject = new BehaviorSubject<boolean>(true);
  isRegistering$ = this.isRegisteringSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setIsRegistering(value: boolean): void {
    this.isRegisteringSubject.next(value);
  }

  sendRequestWithToken(url: string): void {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(token);
    console.log(headers);
    this.http.post(url, {}, { headers: headers }).subscribe(response => {
      console.log(response);
    });
  }
}
