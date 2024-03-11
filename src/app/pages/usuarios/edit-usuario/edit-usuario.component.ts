import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [NavbarDashComponent,  ReactiveFormsModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
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
  }

  obtenerUsuario(userId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/users/${userId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.usuario = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener usuario:', error);
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
    // Aquí puedes implementar la lógica para enviar los datos del formulario a la API para editar el usuario
  }
}
