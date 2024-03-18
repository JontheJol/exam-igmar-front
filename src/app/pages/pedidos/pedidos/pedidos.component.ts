import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, RouterModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private http: HttpClient, private router: Router) {}
  orders: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerPedidos() {
    const endpoint = 'http://127.0.0.1:8000/api/orders';
    this.http.get<any[]>(endpoint).subscribe(
      (data: any[]) => {
        this.orders = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener pedidos:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerPedidos();
  }
  
  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];
  
    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (purchase: any) => this.editarCompra(purchase),
    };
  
    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (purchase: any) => this.eliminarCompra(purchase),
      clase: 'btn-eliminar'
    };
  
    this.botonesAccion.push(editarButton, eliminarButton);
  
    // Asignar botones a cada usuario
    this.orders.forEach(categorie => {
      categorie.botonesAccion = this.botonesAccion;
      categorie.user = categorie.user.name;
    });
  }

  eliminarCompra(purchase: any) {
    const endpoint = `http://127.0.0.1:8000/api/purchases/${purchase.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Compra eliminada correctamente';
        this.obtenerPedidos();
      },
      error => {
        console.error('Error al eliminar la compra:', error);
        this.notificacion = 'Error al eliminar la compra';
      }
    );
  }

  editarCompra(purchase: any) {
    console.log('Editar compra:', purchase);
    this.router.navigate(['dashboard/compras/edit', purchase.id]);
  }

  agregarCompra(){
    this.router.navigate(['dashboard/compras/create']);
  }
}
