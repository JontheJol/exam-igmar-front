import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-comentario',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-comentario.component.html',
  styleUrl: './edit-comentario.component.css'
})
export class EditComentarioComponent implements OnInit {
  comentarioForm: FormGroup;
  comentario: any;
  mensaje: string | null = null;
  isDisabled: boolean = true;
  user_name: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.comentarioForm = this.formBuilder.group({
      user_name: [{ value: ''}, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      comment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const comentarioId = params['id'];
      this.obtenerComentario(comentarioId);
    });
    this.http.get<any>('http://127.0.0.1:8000/api/users/').subscribe(
      (data: any) => {
        this.user_name = data;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  obtenerComentario(comentarioId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/comments/${comentarioId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.comentario = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener el comentario:', error);
        this.router.navigate(['dashboard/comentarios/']);
      }
    );
  }

  initializeForm(): void {
    if (this.comentario) {
      // Hacer la consulta a la API de usuarios
      this.http.get<any>(`http://127.0.0.1:8000/api/users/${this.comentario.user_id}`).subscribe(
        (userData: any) => {
          this.comentarioForm.patchValue({
            user_name: userData.name,  // Suponiendo que el nombre del usuario está en el campo 'name'
            comment: this.comentario.comment
          });
        },
        error => {
          console.error('Error al obtener el nombre del usuario:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.comentarioForm.valid) {
      const comentarioId = this.comentario.id;
      const endpoint = `http://127.0.0.1:8000/api/comments/${comentarioId}/update`;
      const userData = {
        user_name: this.comentarioForm.value.user_name,
        comment: this.comentarioForm.value.comment
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Comentario actualizado:', response);
          this.mensaje = 'Comentario actualizado correctamente.';
        },
        error => {
          console.error('Error al actualizar comentario:', error);
          this.mensaje = 'Error al actualizar comentario. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
