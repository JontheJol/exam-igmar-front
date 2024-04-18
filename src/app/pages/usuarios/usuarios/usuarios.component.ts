import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}
  usuarios: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerUsuarios() {
    const endpoint = 'https://ed28-187-190-56-49.ngrok-free.app/api/users';
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>(endpoint, {headers: headers}).subscribe(
      (data: any[]) => {
        this.usuarios = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];

    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (usuario: any) => this.editarUsuario(usuario),
      routerLink: (usuario: any) => ['/dashboard/usuarios/edit', usuario.id]
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (usuario: any) => this.eliminarUsuario(usuario),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    // Asignar botones a cada usuario
    this.usuarios.forEach(usuario => {
      usuario.botonesAccion = this.botonesAccion;
    });
  }

  eliminarUsuario(usuario: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/users/${usuario.id}/deactivate`;
    this.http.put(endpoint, {}, {headers: headers}).subscribe(
      () => {
        console.log('Usuario desactivado correctamente');
        this.notificacion = 'Usuario desactivado correctamente';
        this.obtenerUsuarios();
      },
      error => {
        console.error('Error al desactivar usuario:', error);
        this.notificacion = 'Error al desactivar usuario';
      }
    );
  }

  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
    this.router.navigate(['dashboard/usuarios/edit', usuario.id]);
  }
}
