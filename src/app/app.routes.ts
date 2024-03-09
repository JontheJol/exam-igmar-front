import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},
    { path: '', redirectTo: '/ingreso', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
    ];
