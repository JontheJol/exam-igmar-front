import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    private router: Router
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
    const endpoint = `http://127.0.0.1:8000/api/categories/${categoriaId}`;
    this.http.get<any>(endpoint).subscribe(
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
      const userId = this.categoria.id;
      const endpoint = `http://127.0.0.1:8000/api/users/${userId}/update`;
      const userData = {
        name: this.categoriaForm.value.name,
        phone: this.categoriaForm.value.phone,
        rol: this.categoriaForm.value.rol
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Usuario actualizado:', response);
          this.mensaje = 'Usuario actualizado correctamente.';
        },
        error => {
          console.error('Error al actualizar usuario:', error);
          this.mensaje = 'Error al actualizar usuario. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
