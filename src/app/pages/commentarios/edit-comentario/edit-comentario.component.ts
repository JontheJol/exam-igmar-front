import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-comentario',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-comentario.component.html',
  styleUrl: './edit-comentario.component.css'
})
export class EditComentarioComponent implements OnInit {
  categoriaForm: FormGroup;
  comment: any;
  mensaje: string | null = null; // Inicialmente no hay mensaje
  isDisabled: boolean = true;

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
      comment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      user_name: [{ value: '', disabled: this.isDisabled }, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });
  }

  obtenerCategoria(categoriaId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/comments/${categoriaId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.comment = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la categoria:', error);
        this.router.navigate(['dashboard/comentarios/']);
      }
    );
  }

  initializeForm(): void {
    if (this.comment) {
      this.categoriaForm.patchValue({
        comment: this.comment.comment,
        user_name: this.comment.user_id
      });
    }
  }

  onSubmit(): void {
    if (this.categoriaForm.valid) {
      const categoryId = this.comment.id;
      const endpoint = `http://127.0.0.1:8000/api/categories/${categoryId}/update`;
      const userData = {
        name: this.categoriaForm.value.name,
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
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
