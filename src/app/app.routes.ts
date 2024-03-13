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

import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { EditCategoriaComponent } from './pages/categorias/edit-categoria/edit-categoria.component';
import { AddCategoriaComponent } from './pages/categorias/add-categoria/add-categoria.component';

import { ComentariosComponent } from './pages/commentarios/comentarios/comentarios.component';

import { PlataformasComponent } from './pages/plataformas/plataformas/plataformas.component';
import { EditPlataformaComponent } from './pages/plataformas/edit-plataforma/edit-plataforma.component';
import { AddPlataformaComponent } from './pages/plataformas/add-plataforma/add-plataforma.component';



export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent}, // TODO: no se que otra validacion necesitemos para acceder al dashboard
    {path: 'dashboard/usuarios', component: UsuariosComponent},
    {path: 'dashboard/usuarios/edit/:id', component: EditUsuarioComponent },
    // Productos
    {path: 'dashboard/productos/productos', component: ProductosComponent},
    // Categorias
    {path: 'dashboard/categorias/categorias', component: CategoriasComponent},
    {path: 'dashboard/categorias/edit/:id', component: EditCategoriaComponent},
    {path: 'dashboard/categorias/create', component: AddCategoriaComponent},
    // Comentarios
    {path: 'dashboard/comentarios/comentarios', component: ComentariosComponent},
    // Plataformas
    {path: 'dashboard/plataformas/plataformas', component: PlataformasComponent},
    {path: 'dashboard/plataformas/edit/:id', component: EditPlataformaComponent},
    {path: 'dashboard/plataformas/create', component: AddPlataformaComponent},

    {path: '', redirectTo: '/ingreso', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent },
    ];
