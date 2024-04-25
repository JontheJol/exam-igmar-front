import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
// const authService = inject(AuthService);
const router = inject(Router);
const cookieService = inject(CookieService);

//CAnmatch es para 
  const token = cookieService.get('authToken');
  if (token) {
    console.log("entro")
    return true;
  }
  else{
  const url = router.createUrlTree(['/ingreso']);
  console.log(url)
  return url;
  }
};
