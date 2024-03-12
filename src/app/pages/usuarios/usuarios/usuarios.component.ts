import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  constructor(private http: HttpClient, private router: Router) {}
  usuarios: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerUsuarios() {
    const endpoint = 'http://127.0.0.1:8000/api/users';
    this.http.get<any[]>(endpoint).subscribe(
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
    this.botonesAccion = []; // Limpiar el array antes de agregar nuevos botones
    this.usuarios.forEach(usuario => {
      this.botonesAccion.push(
        {
          nombre: 'Editar',
          accion: () => this.editarUsuario(usuario),
          routerLink: ['/dashboard/usuarios/edit', usuario.id]
        }
      );
      (
        {
          nombre: 'Eliminar',
          accion: () => this.eliminarUsuario(usuario),
          clase: 'btn-eliminar'
        }
      );
    });
  }

  eliminarUsuario(usuario: any) {
    const endpoint = `http://127.0.0.1:8000/api/users/${usuario.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
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
  }
}
