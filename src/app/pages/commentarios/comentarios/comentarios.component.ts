import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, RouterModule, CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  constructor(private http: HttpClient, private router: Router) {}
  categories: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerComentarios() {
    const endpoint = 'http://127.0.0.1:8000/api/categories';
    this.http.get<any[]>(endpoint).subscribe(
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
    this.obtenerComentarios();
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
    const endpoint = `http://127.0.0.1:8000/api/categories/${categorie.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Categoria desactivada correctamente';
        this.obtenerComentarios();
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
