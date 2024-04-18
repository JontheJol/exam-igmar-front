import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, RouterModule, DynamicTableComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}
  categories: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerCategorias() {
    const endpoint = 'https://ed28-187-190-56-49.ngrok-free.app/api/categories';
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>(endpoint, { headers: headers }).subscribe(
      (data: any[]) => {
        this.categories = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];

    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (categorie: any) => this.editarCategoria(categorie),
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (categorie: any) => this.eliminarCategoria(categorie),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    // Asignar botones a cada usuario
    this.categories.forEach(categorie => {
      categorie.botonesAccion = this.botonesAccion;
    });
  }

  eliminarCategoria(categorie: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/categories/${categorie.id}/deactivate`;
    this.http.put(endpoint, {}, { headers: headers } ).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Categoria desactivada correctamente';
        this.obtenerCategorias();
      },
      error => {
        console.error('Error al desactivar la categoria:', error);
        this.notificacion = 'Error al desactivar la categoria';
      }
    );
  }

  editarCategoria(categoria: any) {
    console.log('Editar categoria:', categoria);
    this.router.navigate(['dashboard/categorias/edit', categoria.id]);
  }

  agregarCategoria(){
    this.router.navigate(['dashboard/categorias/create']);
  }
}
