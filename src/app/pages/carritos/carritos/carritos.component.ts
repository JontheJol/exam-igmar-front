import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carritos',
  standalone: true,
  imports: [NavbarDashComponent,DynamicTableComponent,RouterModule,CommonModule],
  templateUrl: './carritos.component.html',
  styleUrl: './carritos.component.css'
})
export class CarritosComponent {
  constructor(private http: HttpClient, private router: Router) {}
  carts: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerCarritos() {
    const endpoint = 'https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/carts';
    this.http.get<any[]>(endpoint).subscribe(
      (data: any[]) => {
        this.carts = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );

  }

  ngOnInit(): void {
    this.obtenerCarritos();
  }

  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];

    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (cart: any) => this.editarCarrito(cart),
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (cart: any) => this.eliminarCarrito(cart),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    this.carts.forEach(cart => {
      cart.botonesAccion = this.botonesAccion;
      cart.product = cart.product.name; // Cambiar objeto de categoría por nombre de categoría
      cart.user = cart.user.name; // Cambiar objeto de plataforma por nombre de plataforma
      cart.quantity = cart.quantity
    });
  }

  eliminarCarrito(cart: any) {
    const endpoint = `https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/carts/${cart.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Comentario eliminado correctamente';
        this.obtenerCarritos();
        console.log("se desactivó el carrito")
      },
      error => {
        console.error('Error al desactivar el carrito:', error);
        this.notificacion = 'Error al desactivar el carrito';
      }
    );
  }

  editarCarrito(carrito: any) {
    console.log('Editar carrito:', carrito);
    this.router.navigate(['dashboard/carrito/edit', carrito.id]);
  }

  agregarCarrito(){
    this.router.navigate(['dashboard/carrito/create']);
  }
}

