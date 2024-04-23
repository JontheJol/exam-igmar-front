import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent} from './pages/login/login.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { authGuard } from './guards/auth.guard';

import { GameComponent } from './pages/game/game.component';
import { LandingComponent } from './pages/landing/landing.component';
// import { PruebaComponent } from './prueba/prueba.component';

export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},

    // {path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]}, // TODO: no se que otra validacion necesitemos para acceder al dashboard
    // {path: 'dashboard/usuarios', component: UsuariosComponent},
    // {path: 'dashboard/usuarios/edit/:id', component: EditUsuarioComponent },

    {path: 'landing', component: LandingComponent,canActivate:[authGuard]},
    {path: 'game',component: GameComponent,canActivate:[authGuard]},
    {path: 'view-score', component: ViewScoreComponent,canActivate:[authGuard]},


    //  {path: '', redirectTo: '/landing', pathMatch: 'full' },
    {path: '', component: SignupComponent },
    {path: '**', component: SignupComponent },
    ];
