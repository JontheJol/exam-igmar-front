import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent} from './pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios/usuarios.component';
import { EditUsuarioComponent } from './pages/usuarios/edit-usuario/edit-usuario.component';

import { VerificarCodigoComponent } from './pages/verificar-codigo/verificar-codigo.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { LogListComponent } from './log-list/log-list.component';
import { authGuard } from './guards/auth.guard';

import { GameComponent } from './pages/game/game.component';
import { LandingComponent } from './pages/landing/landing.component';
// import { PruebaComponent } from './prueba/prueba.component';
export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},

    {path: 'dashboard', component: DashboardComponent,canActivate:[authGuard]}, // TODO: no se que otra validacion necesitemos para acceder al dashboard
    {path: 'dashboard/usuarios', component: UsuariosComponent},
    {path: 'dashboard/usuarios/edit/:id', component: EditUsuarioComponent },

    {path: 'landing', component: LandingComponent},
    {path: 'game',component: GameComponent},
    {path: 'view-score', component: ViewScoreComponent},

    //WebSocket
    // {path: 'prueba', component: PruebaComponent},
//logs
    {path: 'dashboard/logs', component: LogListComponent},

     {path: '', redirectTo: '/ingreso', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent },
    ];
