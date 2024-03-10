import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LoginService } from '../../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  endpoint: string = ''; // Variable para almacenar el endpoint

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loginService.isRegistering$.subscribe((value) => {
      this.switchRegistrationMode(value);
    });
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    //this.switchRegistrationMode(true); // Setea el modo de registro al inicializar el formulario
  }

  switchRegistrationMode(isRegistering: boolean): void {
    if (isRegistering) {
      this.userForm.addControl('name', this.formBuilder.control('', Validators.required));
      this.endpoint = 'http://127.0.0.1:8000/api/register'; // Endpoint para el registro
    } else {
      this.userForm.removeControl('name');
      this.endpoint = 'http://127.0.0.1:8000/api/login'; // Endpoint para el inicio de sesión
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      console.log("enviado");
      
      // Enviar la solicitud al servidor utilizando HttpClient
      this.http.post(this.endpoint, this.userForm.value)
        .subscribe((response) => {
          console.log('Respuesta del servidor:', response);
          // Aquí puedes manejar la respuesta del servidor según corresponda
        }, (error) => {
          console.error('Error al enviar la solicitud:', error);
          // Aquí puedes manejar el error de la solicitud
        });

    } else {
      // Aquí manejas la lógica para los errores de validación, etc.
      console.log("No enviado")
    }
  }
}