import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [NavbarDashComponent,  ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: any;
  mensaje: string | null = null; // Inicialmente no hay mensaje

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.usuarioForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.obtenerUsuario(userId);
    });
    this.usuarioForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      rol: ['', Validators.required]
  });
  }

  obtenerUsuario(userId: number): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `http://127.0.0.1:8000/api/users/${userId}`;
    this.http.get<any>(endpoint, {headers: headers}).subscribe(
      (data: any) => {
        this.usuario = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener usuario:', error);
        this.router.navigate(['dashboard/usuarios/']);
      }
    );
  }

  initializeForm(): void {
    if (this.usuario) {
      this.usuarioForm.patchValue({
        name: this.usuario.name,
        phone: this.usuario.phone,
        rol: this.usuario.rol
      });
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const userId = this.usuario.id;
      const endpoint = `http://127.0.0.1:8000/api/users/${userId}/update`;
      const userData = {
        name: this.usuarioForm.value.name,
        phone: this.usuarioForm.value.phone,
        rol: this.usuarioForm.value.rol
      };
      console.log(userData);
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(endpoint, userData, {headers: headers}).subscribe(
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
