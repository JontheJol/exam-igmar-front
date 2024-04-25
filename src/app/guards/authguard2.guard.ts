import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
export const authguard2Guard: CanActivateFn = (route, state) => {
// const authService = inject(AuthService);
const router = inject(Router);
const cookieService = inject(CookieService);

//CAnmatch es para 
const token = cookieService.get('authToken');
  if (!token) {

    return true;
  }
  else{
  const url = router.createUrlTree(['/landing']);
  return url;
  }};
