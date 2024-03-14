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
    const endpoint = 'http://127.0.0.1:8000/api/comments';
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
      accion: (categorie: any) => this.editarComentario(categorie),
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

  eliminarCategoria(comment: any) {
    const endpoint = `http://127.0.0.1:8000/api/comments/${comment.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Comenatrio eliminado correctamente';
        this.obtenerComentarios();
      },
      error => {
        console.error('Error al desactivar el comentario:', error);
        this.notificacion = 'Error al desactivar el comentario';
      }
    );
  }

  editarComentario(comentario: any) {
    console.log('Editar categoria:', comentario);
    this.router.navigate(['dashboard/comentarios/edit', comentario.id]);
  }

  agregarCategoria(){
    this.router.navigate(['dashboard/categorias/create']);
  }
}
