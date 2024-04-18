import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, RouterModule, CommonModule],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}
  commentaries: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerComentarios() {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = 'https://ed28-187-190-56-49.ngrok-free.app/api/comments';
    this.http.get<any[]>(endpoint, {headers: headers}).subscribe(
      (data: any[]) => {
        this.commentaries = data;
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
      accion: (commentary: any) => this.editarComentario(commentary),
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (commentary: any) => this.eliminarComentario(commentary),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    this.commentaries.forEach(commentary => {
      commentary.botonesAccion = this.botonesAccion;
      commentary.product = commentary.product.name; // Cambiar objeto de categoría por nombre de categoría
      commentary.user = commentary.user.name; // Cambiar objeto de plataforma por nombre de plataforma
    });
  }

  eliminarComentario(comment: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/comments/${comment.id}/deactivate`;
    this.http.put(endpoint, {}, {headers: headers}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Comentario eliminado correctamente';
        this.obtenerComentarios();
        console.log("se desactivó el comentario")
      },
      error => {
        console.error('Error al desactivar el comentario:', error);
        this.notificacion = 'Error al desactivar el comentario';
      }
    );
  }

  editarComentario(commentary: any) {
    console.log('Editar categoria:', commentary);
    this.router.navigate(['dashboard/comentarios/edit', commentary.id]);
  }

  agregarCategoria(){
    this.router.navigate(['dashboard/comentarios/create']);
  }
}
