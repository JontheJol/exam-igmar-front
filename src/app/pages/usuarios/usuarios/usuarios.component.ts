import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios = [
    { name: 'Juan', phone: '123456789', email: 'juan@example.com', active: true, rol: 'Admin' },
    { name: 'María', phone: '987654321', email: 'maria@example.com', active: false, rol: 'User' }
  ];

  botonesAccion = [
    { nombre: 'Editar', accion: this.editarUsuario },
    // Puedes agregar más botones de acción según tus necesidades
  ];

  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
    // Agrega aquí la lógica para editar el usuario
  }
}
