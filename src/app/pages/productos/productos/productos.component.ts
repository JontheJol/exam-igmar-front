import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(private http:HttpClient){}
  productos: any[] = [];

  obtenerProductos(){
    const endpoint = "http://127.0.0.1:8000/api/products";
    this.http.get<any[]>(endpoint).subscribe(
      (data:any[]) => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  botonesAccion = [
    {nombre: 'Editar', accion: this.editarProducto},
    {nombre: 'Eliminar', accion: this.eliminarProducto, clase:'btn-eliminar'}
  ];

  eliminarProducto(producto: any) {
    const endpoint = `http:/}/127.0.0.1:8000/api/products/${producto.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      (response: any) => {
        console.log('Producto desactivado:', producto);
        this.obtenerProductos();
      },
      error => {
        console.error('Error al desactivar producto:', error)
      }
    )
  }
  editarProducto(producto: any) {
    console.log('Editar producto:', producto);
    // Agrega aquí la lógica para editar el usuario
  }
}
