import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent  {
  constructor(private http: HttpClient) {}
  usuarios: any[] = [];

  obtenerUsuarios() {
    const endpoint = 'http://127.0.0.1:8000/api/users'; // Reemplaza 'tu/endpoint/aqui' con tu URL real
    this.http.get<any[]>(endpoint).subscribe(
      (data: any[]) => {
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
    { nombre: 'Editar', accion: this.editarUsuario },
    { nombre: 'Eliminar', accion: this.eliminarUsuario, clase: 'btn-eliminar' }
    // Puedes agregar más botones de acción según tus necesidades
  ];

  eliminarUsuario(usuario: any){

  }

  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
    // Agrega aquí la lógica para editar el usuario
  }
}
