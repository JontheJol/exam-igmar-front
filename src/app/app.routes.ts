import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';

export const routes: Routes = [ 
    {path: 'registro', component: SignupComponent},
    { path: '**', component: PageNotFoundComponent },
    ];
