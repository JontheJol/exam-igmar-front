import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

export const authguard2Guard: CanActivateFn = (route, state) => {
// const authService = inject(AuthService);
const router = inject(Router);
const cookieService = inject(CookieService);
// en esta api vamos a ver si el usuario tiene un token autenticado o no y si es qeu estaba ver si estaba en una partida o no

const token = cookieService.get('authToken');
  if (!token) {

    return true;
  }
  else{
  const url = router.createUrlTree(['/landing']);
  return url;
  }
};
