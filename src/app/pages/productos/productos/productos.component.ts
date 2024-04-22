import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, RouterModule, DynamicTableComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(private http: HttpClient, private router: Router,
    private cookieService: CookieService
    ) {}
  products: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío


  obtenerProductos() {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = 'http://127.0.0.1:8000/api/products';
    this.http.get<any[]>(endpoint, { headers: headers }).subscribe(
      (data: any[]) => {
        this.products = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];

    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (product: any) => this.editarProducto(product),
    };

    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (product: any) => this.eliminarProducto(product),
      clase: 'btn-eliminar'
    };

    this.botonesAccion.push(editarButton, eliminarButton);

    // Asignar botones a cada usuario
    this.products.forEach(product => {
      product.botonesAccion = this.botonesAccion;
      product.category = product.category.name; // Cambiar objeto de categoría por nombre de categoría
      product.platform = product.platform.name; // Cambiar objeto de plataforma por nombre de plataforma
    });
  }

  eliminarProducto(product: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `http://127.0.0.1:8000/api/products/${product.id}/deactivate`;
    this.http.put(endpoint, {}, { headers: headers }).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Producto desactivado correctamente';
        this.obtenerProductos();
      },
      error => {
        console.error('Error al desactivar la categoria:', error);
        this.notificacion = 'Error al desactivar producto';
      }
    );
  }

  editarProducto(categoria: any) {
    console.log('Editar categoria:', categoria);
    this.router.navigate(['dashboard/productos/edit', categoria.id]);
  }

  agregarProducto(){
    this.router.navigate(['dashboard/productos/create']);
  }
}
