import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  public isAuth(): Observable<string> {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.post<string>('http://127.0.0.1:8000/api/partida',{}, { headers: headers });
  }
}
