import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent} from './pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ViewScoreComponent } from './view-score/view-score.component';
import { authGuard } from './guards/auth.guard';
import { authguard2Guard } from './guards/authguard2.guard';
import { GameComponent } from './pages/game/game.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
    {path: 'registro', component: SignupComponent,canActivate:[authguard2Guard]},
    {path: 'ingreso', component: LoginComponent,canActivate:[authguard2Guard]},

    {path: 'landing', component: LandingComponent,canActivate:[authGuard]},
    {path: 'game',component: GameComponent,canActivate:[authGuard]},
    {path: 'view-score', component: ViewScoreComponent,canActivate:[authGuard]},


     {path: '', component: SignupComponent,canActivate:[authguard2Guard]},
    {path: '**', component: LoginComponent,canActivate:[authguard2Guard] },
    ];
