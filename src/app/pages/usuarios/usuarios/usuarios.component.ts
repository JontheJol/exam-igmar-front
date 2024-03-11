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
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent  {
  constructor(private http: HttpClient, private router: Router) {}
  usuarios: any[] = [];
  notificacion: string = '';

  obtenerUsuarios() {
    const endpoint = 'http://127.0.0.1:8000/api/users'; // Reemplaza 'tu/endpoint/aqui' con tu URL real
    this.http.get<Int16Array[]>(endpoint).subscribe(
      (data: Int16Array[]) => {
        this.usuarios = data; // Asigna los datos de la respuesta de la API al arreglo de usuarios
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  botonesAccion = [
    { nombre: 'Editar', accion: this.editarUsuario, routerLink: ['/dashboard/usuarios/edit'] },
    { nombre: 'Eliminar', accion: (usuario: any) => this.eliminarUsuario(usuario), clase: 'btn-eliminar' }
    // Puedes agregar más botones de acción según tus necesidades
  ];

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
    this.router.navigate(['/dashboard/usuarios/edit', usuario.id]);
  }
}
