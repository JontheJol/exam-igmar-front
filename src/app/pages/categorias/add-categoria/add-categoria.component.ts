import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [NavbarDashComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent {
  categoriaForm: FormGroup;
  categoria: any;
  mensaje: string | null = null; // Inicialmente no hay mensaje

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router, 
    private cookieService: CookieService
  ) {
    this.categoriaForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const endpoint = `http://127.0.0.1:8000/api/categories/create`;
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const categoryData = {
        name: this.categoriaForm.value.name,
      };
      console.log(categoryData);
      // Importante que el metodo sea post cuando creamos, basic kinda sht that sometimes we forget
      this.http.post(endpoint, categoryData, { headers: headers }).subscribe(
        (response: any) => {
          console.log('Categoria agregada:', response);
          this.mensaje = 'Categoria creada correctamente.';
        },
        error => {
          console.error('Error al crear categoria:', error);
          this.mensaje = 'Error al crear categoria. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
