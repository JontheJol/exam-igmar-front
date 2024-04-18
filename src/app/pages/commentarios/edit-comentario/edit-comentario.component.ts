import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


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
    private router: Router,
    private cookieService: CookieService
  ) {
    this.comentarioForm = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      user_name: [{ value: ''}, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      comment: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const comentarioId = params['id'];
      this.obtenerComentario(comentarioId);
    });

    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('https://ed28-187-190-56-49.ngrok-free.app/api/users/', {headers: headers}).subscribe(
      (data: any) => {
        this.user_name = data;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }

  obtenerComentario(comentarioId: number): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/comments/${comentarioId}`;
    this.http.get<any>(endpoint, {headers: headers}).subscribe(
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
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any>(`https://ed28-187-190-56-49.ngrok-free.app/api/users/${this.comentario.user_id}`, {headers: headers}).subscribe(
        (userData: any) => {
          this.comentarioForm.patchValue({
            user_id: this.comentario.user_id,
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
    if (this.comentarioForm.valid && this.comentario && this.comentario.product_id) {
      const comentarioId = this.comentario.id;
      const endpoint = `https://ed28-187-190-56-49.ngrok-free.app/api/comments/${comentarioId}/update`;
      const userData = {
        user_id: this.comentarioForm.value.user_id,
        product_id: this.comentario.product_id,
        rating: this.comentario.rating,
        comment: this.comentarioForm.value.comment
      };
      console.log(userData);
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(endpoint, userData, {headers: headers}).subscribe(
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
