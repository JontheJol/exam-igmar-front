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
private readonly baseUrl = "http://192.168.116.105:8000/"
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }



  setIsRegistering(value: boolean): void {
    this.isRegisteringSubject.next(value);
  }

  sendRequestWithToken(url: string, data: object) { //para insertar
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json');  // Add the Accept header
    // console.log(token);
    // console.log(headers);

      return this.http.post(this.baseUrl + url, data, { headers: headers });
  }


  getRequestWithToken(url: string) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    .set('ngrok-skip-browser-warning', 'true'); // Add the ngrok-skip-browser-warning header
    return this.http.get(this.baseUrl + url, { headers: headers });
  }

  updateRequestWithToken(url: string, data: object) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token},`);
// console.log(data, url, headers);
    return this.http.put(this.baseUrl + url, data, { headers: headers });
  }

  deleteRequestWithToken(url: string, data: object) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// console.log(data, url, headers);
    return this.http.delete(this.baseUrl + url, { headers: headers });
  }
}
