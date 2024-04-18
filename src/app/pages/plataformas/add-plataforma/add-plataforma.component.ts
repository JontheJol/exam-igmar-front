import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-plataforma',
  standalone: true,
  imports: [NavbarDashComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-plataforma.component.html',
  styleUrl: './add-plataforma.component.css'
})
export class AddPlataformaComponent {
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
      const endpoint = `https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/platforms/create`;
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
          this.mensaje = 'Plataforma creada correctamente.';
        },
        error => {
          console.error('Error al crear categoria:', error);
          this.mensaje = 'Error al crear la plataforma. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
