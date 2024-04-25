import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export const authGuard: CanActivateFn =  (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);
const cookieService = inject(CookieService);
const http = inject(HttpClient);
console.log("bucle")
const token = cookieService.get('authToken');

if (!token) {
  const url = router.createUrlTree(['/landing']);
  return url;
}
return true;
}
