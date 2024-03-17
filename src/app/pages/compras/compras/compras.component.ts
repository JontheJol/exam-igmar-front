import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, RouterModule, CommonModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {
  constructor(private http: HttpClient, private router: Router) {}
  purchases: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerEnvios() {
    const endpoint = 'http://127.0.0.1:8000/api/purchases';
    this.http.get<any[]>(endpoint).subscribe(
      (data: any[]) => {
        this.purchases = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener compras:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerEnvios();
  }
  
  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];
  
    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (purchase: any) => this.editarCategoria(purchase),
    };
  
    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (purchase: any) => this.eliminarEnvio(purchase),
      clase: 'btn-eliminar'
    };
  
    this.botonesAccion.push(editarButton, eliminarButton);
  
    // Asignar botones a cada usuario
    this.purchases.forEach(categorie => {
      categorie.botonesAccion = this.botonesAccion;
      categorie.product = categorie.product.name;
      categorie.user = categorie.user.name;
    });
  }

  eliminarEnvio(shipment: any) {
    const endpoint = `http://127.0.0.1:8000/api/shipments/${shipment.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Envio eliminado correctamente';
        this.obtenerEnvios();
      },
      error => {
        console.error('Error al desactivar la categoria:', error);
        this.notificacion = 'Error al eliminar el envio';
      }
    );
  }

  editarCategoria(shipment: any) {
    console.log('Editar categoria:', shipment);
    this.router.navigate(['dashboard/envios/edit', shipment.id]);
  }

  agregarCategoria(){
    this.router.navigate(['dashboard/envios/create']);
  }
}
