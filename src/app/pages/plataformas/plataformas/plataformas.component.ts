import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-plataformas',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule],
  templateUrl: './plataformas.component.html',
  styleUrl: './plataformas.component.css'
})
export class PlataformasComponent {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}
  platforms: any[] = [];
  notificacion: string = '';
  botonesAccion: any[] = []; // Define botonesAccion como un array vacío

  obtenerPlataformas() {
    const endpoint = 'http://127.0.0.1:8000/api/platforms';
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>(endpoint, { headers: headers }).subscribe(
      (data: any[]) => {
        this.platforms = data;
        this.configurarBotonesAccion(); // Llama a la función para configurar los botones de acción
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerPlataformas();
  }
  
  configurarBotonesAccion() {
    // Limpiar el array antes de agregar nuevos botones
    this.botonesAccion = [];
  
    // Agregar botones de Editar y Eliminar una vez
    const editarButton = {
      nombre: 'Editar',
      accion: (platform: any) => this.editarPlataforma(platform),
    };
  
    const eliminarButton = {
      nombre: 'Eliminar',
      accion: (platform: any) => this.eliminarPlataforma(platform),
      clase: 'btn-eliminar'
    };
  
    this.botonesAccion.push(editarButton, eliminarButton);
  
    // Asignar botones a cada usuario
    this.platforms.forEach(platform => {
      platform.botonesAccion = this.botonesAccion;
    });
  }

  eliminarPlataforma(platform: any) {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `http://127.0.0.1:8000/api/platforms/${platform.id}/deactivate`;
    this.http.put(endpoint, {}, { headers: headers }).subscribe(
      () => {
        //console.log('Usuario desactivado correctamente');
        this.notificacion = 'Plataforma desactivada correctamente';
        this.obtenerPlataformas();
      },
      error => {
        console.error('Error al desactivar la plataforma:', error);
        this.notificacion = 'Error al desactivar la categoria';
      }
    );
  }

  editarPlataforma(plataforma: any) {
    console.log('Editar plataforma:', plataforma);
    this.router.navigate(['dashboard/plataformas/edit', plataforma.id]);
  }

  agregarPlataforma(){
    this.router.navigate(['dashboard/plataformas/create']);
  }
}
