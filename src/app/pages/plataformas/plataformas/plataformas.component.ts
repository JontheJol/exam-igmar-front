import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-plataformas',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule],
  templateUrl: './plataformas.component.html',
  styleUrl: './plataformas.component.css'
})
export class PlataformasComponent {

  constructor(private http: HttpClient, private router: Router) {}
  categories: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerCategorias() {
    const endpoint = 'http://127.0.0.1:8000/api/categories';
    this.http.get<any[]>(endpoint).subscribe(
      (data: any[]) => {
        this.categories = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }
  
  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];
  
    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (categorie: any) => this.editarCategoria(categorie),
    };
  
    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (categorie: any) => this.eliminarCategoria(categorie),
      clase: 'btn-eliminar'
    };
  
    this.botonesAccion.push(editarButton, eliminarButton);
  
    // Asignar botones a cada usuario
    this.categories.forEach(categorie => {
      categorie.botonesAccion = this.botonesAccion;
    });
  }

  eliminarCategoria(categorie: any) {
    const endpoint = `http://127.0.0.1:8000/api/categories/${categorie.id}/deactivate`;
    this.http.put(endpoint, {}).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Categoria desactivada correctamente';
        this.obtenerCategorias();
      },
      error => {
        console.error('Error al desactivar la categoria:', error);
        this.notificacion = 'Error al desactivar la categoria';
      }
    );
  }

  editarCategoria(categoria: any) {
    console.log('Editar categoria:', categoria);
    this.router.navigate(['dashboard/categorias/edit', categoria.id]);
  }

  agregarCategoria(){
    this.router.navigate(['dashboard/categorias/create']);
  }
}
