import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, RouterModule, CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}
  orders: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerPedidos() {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = 'https://ed28-187-190-56-49.ngrok-free.app/api/orders';

    this.http.get<any[]>(endpoint, {headers: headers}).subscribe(
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
      accion: (purchase: any) => this.editarPedido(purchase),
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (purchase: any) => this.eliminarPedido(purchase),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    // Asignar botones a cada usuario
    this.orders.forEach(categorie => {
      categorie.botonesAccion = this.botonesAccion;
      categorie.user = categorie.user.name;
    });
  }

  eliminarPedido(order: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/orders/${order.id}/deactivate`;
    this.http.put(endpoint, {}, {headers: headers}).subscribe(
      () => {
        this.notificacion = 'Pedido eliminado correctamente';
        this.obtenerPedidos();
      },
      error => {
        console.error('Error al eliminar el pedido:', error);
        this.notificacion = 'Error al eliminar el pedido';
      }
    );
  }

  editarPedido(order: any) {
    console.log('Editar pedido:', order);
    this.router.navigate(['dashboard/pedidos/edit', order.id]);
  }

  agregarPedido(){
    this.router.navigate(['dashboard/pedidos/create']);
  }
}
