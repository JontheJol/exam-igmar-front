import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-categoria',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css'
})
export class EditCategoriaComponent implements OnInit {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.obtenerCategoria(categoryId);
    });
    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  });
  }

  obtenerCategoria(categoriaId: number): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `http://127.0.0.1:8000/api/categories/${categoriaId}`;
    this.http.get<any>(endpoint,{ headers: headers }).subscribe(
      (data: any) => {
        this.categoria = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la categoria:', error);
        this.router.navigate(['dashboard/categorias/']);
      }
    );
  }

  initializeForm(): void {
    if (this.categoria) {
      this.categoriaForm.patchValue({
        name: this.categoria.name,
      });
    }
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const categoryId = this.categoria.id;
      const endpoint = `http://127.0.0.1:8000/api/categories/${categoryId}/update`;
      const userData = {
        name: this.categoriaForm.value.name,
      };
      console.log(userData);
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(endpoint, userData, { headers: headers }).subscribe(
        (response: any) => {
          console.log('Categoria actualizada:', response);
          this.mensaje = 'Categoria actualizada correctamente.';
        },
        error => {
          console.error('Error al actualizar categoria:', error);
          this.mensaje = 'Error al actualizar categoria. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
