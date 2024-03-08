import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    //TODO: cambiar la redireccion default a la ruta de ingresar
    { path: '', redirectTo: '/registro', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
    ];
