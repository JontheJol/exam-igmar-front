import { Component, OnInit } from '@angular/core';
import { TokenService  } from '../../token.service';
import { NavbarDashComponent } from '../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule, RouterModule],
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})


export class InventariosComponent implements OnInit {
agregarInventario() {
throw new Error('Method not implemented.');
}
  campos: string[] = ['nombre', 'cantidad'];
  datos: any[] = [];
  botonesAccion: { nombre: string, accion: Function, routerLink?: string, clase?: string }[] = [
    { nombre: 'Editar', accion: (producto: { id: string }) => this.editarProducto(producto), clase: 'btn-editar' },
    { nombre: 'Eliminar', accion: (producto: any) => this.eliminarProducto(producto), clase: 'btn-eliminar' },
    // Agrega más botones aquí
  ];

  constructor(private inventarioService: TokenService) { }

  ngOnInit() {
    this.inventarioService.getRequestWithToken('http://localhost:8000/api/inventories/index').subscribe((response: any) => {
      this.datos = response.data;
      console.log(response)
    });
  }

    editarProducto(producto: { id: string }) {
      console.log(producto);
      const id = producto.id;
      console.log(id);
      this.inventarioService.updateRequestWithToken(`http://localhost:8000/api/inventories/${id}/update`, producto).subscribe((response: any) => {
        console.log(response);
      });
    }

    eliminarProducto(producto: { id: string }): void {
      console.log(producto);
      const id = producto.id;
      console.log(id);
      this.inventarioService.deleteRequestWithToken(`http://localhost:8000/api/inventories/${id}/deactivate`, producto).subscribe((response: any) => {
        console.log(response);
      });
    }

  }
  
