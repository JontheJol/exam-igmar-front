import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export const authGuard: CanActivateFn = async (route, state) => {
const authService = inject(AuthService);
const router = inject(Router);
const cookieService = inject(CookieService);
const http = inject(HttpClient);

var url = router.createUrlTree(['/ingreso']);
// // authService.isAuth
// console.log(authService.isAuth())

const token = cookieService.get('authToken');
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

http.post<string>('http://127.0.0.1:8000/api/partida',{}, { headers: headers })
  .subscribe((authResult: any) => {
    console.log(authResult);

    if (authResult.mensaje === "Partida") {
      const url = router.createUrlTree(['/game']);
      console.log(authResult);
      return url;
    } else if (authResult.mensaje === "NoPartida") {

      return true;
    }else{
      const url = router.createUrlTree(['/ingreso']);
      console.log(authResult);
      return url;
    }
    
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  console.log("no paso")
  return true ;

  
};
