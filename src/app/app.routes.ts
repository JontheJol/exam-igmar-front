import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent} from './pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios/usuarios.component';
import { EditUsuarioComponent } from './pages/usuarios/edit-usuario/edit-usuario.component';
import { ProductosComponent } from './pages/productos/productos/productos.component';


export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent}, // TODO: no se que otra validacion necesitemos para acceder al dashboard
    {path: 'dashboard/usuarios', component: UsuariosComponent},
    {path: 'dashboard/usuarios/edit', component: EditUsuarioComponent},
    {path: 'dashboard/productos/productos', component: ProductosComponent},
    { path: '', redirectTo: '/ingreso', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
    ];
