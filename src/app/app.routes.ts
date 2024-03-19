import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent} from './pages/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuariosComponent } from './pages/usuarios/usuarios/usuarios.component';
import { EditUsuarioComponent } from './pages/usuarios/edit-usuario/edit-usuario.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';

import { ProductosComponent } from './pages/productos/productos/productos.component';
import { EditProductoComponent } from './pages/productos/edit-producto/edit-producto.component';
import { AddProductoComponent } from './pages/productos/add-producto/add-producto.component';

import { AddCategoriaComponent } from './pages/categorias/add-categoria/add-categoria.component';
import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { EditCategoriaComponent } from './pages/categorias/edit-categoria/edit-categoria.component';

import { VerificarCodigoComponent } from './pages/verificar-codigo/verificar-codigo.component';

import { PlataformasComponent } from './pages/plataformas/plataformas/plataformas.component';
import { EditPlataformaComponent } from './pages/plataformas/edit-plataforma/edit-plataforma.component';
import { AddPlataformaComponent } from './pages/plataformas/add-plataforma/add-plataforma.component';

import { ComentariosComponent } from './pages/commentarios/comentarios/comentarios.component';
import { EditComentarioComponent } from './pages/commentarios/edit-comentario/edit-comentario.component';
import { AddComentarioComponent } from './pages/commentarios/add-comentario/add-comentario.component';

import { CarritosComponent } from './pages/carritos/carritos/carritos.component';
import { EditCarritoComponent } from './pages/carritos/edit-carrito/edit-carrito.component';
import { AddCarritoComponent } from './pages/carritos/add-carrito/add-carrito.component';

import { EnviosComponent } from './pages/envios/envios/envios.component';
import { EditEnviosComponent } from './pages/envios/edit-envios/edit-envios.component';
import { AddEnviosComponent } from './pages/envios/add-envios/add-envios.component';

import { ComprasComponent } from './pages/compras/compras/compras.component';
import { EditComprasComponent } from './pages/compras/edit-compras/edit-compras.component';
import { AddComprasComponent } from './pages/compras/add-compras/add-compras.component';

import { PedidosComponent } from './pages/pedidos/pedidos/pedidos.component';
import { EditPedidosComponent } from './pages/pedidos/edit-pedidos/edit-pedidos.component';
import { AddPedidosComponent } from './pages/pedidos/add-pedidos/add-pedidos.component';

export const routes: Routes = [
    {path: 'registro', component: SignupComponent},
    {path: 'ingreso', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent}, // TODO: no se que otra validacion necesitemos para acceder al dashboard
    {path: 'dashboard/usuarios', component: UsuariosComponent},
    {path: 'dashboard/usuarios/edit/:id', component: EditUsuarioComponent },
    // Productos
    {path: 'dashboard/productos/productos', component: ProductosComponent},
    {path: 'dashboard/productos/edit/:id', component: EditProductoComponent},
    {path: 'dashboard/productos/create', component: AddProductoComponent},
    // Categorias
    {path: 'dashboard/categorias/categorias', component: CategoriasComponent},
    {path: 'dashboard/categorias/edit/:id', component: EditCategoriaComponent},
    {path: 'dashboard/categorias/create', component: AddCategoriaComponent},
    // Plataformas
    {path: 'dashboard/plataformas/plataformas', component: PlataformasComponent},
    {path: 'dashboard/plataformas/edit/:id', component: EditPlataformaComponent},
    {path: 'dashboard/plataformas/create', component: AddPlataformaComponent},
    // Comentarios
    {path: 'dashboard/comentarios/comentarios', component: ComentariosComponent},
    {path: 'dashboard/comentarios/edit/:id', component: EditComentarioComponent},
    {path: 'dashboard/comentarios/create', component: AddComentarioComponent},
    // Carritos
    {path: 'dashboard/carritos/carritos', component: CarritosComponent},
    {path: 'dashboard/carrito/edit/:id', component: EditCarritoComponent},
    {path: 'dashboard/carrito/create', component: AddCarritoComponent},
    // Envios
    {path: 'dashboard/envios/envios', component: EnviosComponent},
    {path: 'dashboard/envios/edit/:id', component: EditEnviosComponent},
    {path: 'dashboard/envios/create', component: AddEnviosComponent},
    // Compras
    {path: 'dashboard/compras/compras', component: ComprasComponent},
    {path: 'dashboard/compras/edit/:id', component: EditComprasComponent},
    {path: 'dashboard/compras/create', component: AddComprasComponent},
    // Pedidos
    {path: 'dashboard/pedidos/pedidos', component: PedidosComponent},
    {path: 'dashboard/pedidos/edit/:id', component: EditPedidosComponent},
    {path: 'dashboard/pedidos/create', component: AddPedidosComponent},

    {path: '', redirectTo: '/ingreso', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent },
    ];
