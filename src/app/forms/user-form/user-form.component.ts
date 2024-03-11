import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LoginService } from '../../login.service';
import { HttpClient } from '@angular/common/http';
import { Validator } from '@angular/forms';

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
  serverError: string = '';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loginService.isRegistering$.subscribe((value) => {
      this.switchRegistrationMode(value);
    });
  }

  

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    });
    //this.switchRegistrationMode(true); // Setea el modo de registro al inicializar el formulario
  }

  switchRegistrationMode(isRegistering: boolean): void {
    if (isRegistering) {
      this.userForm.addControl('name', this.formBuilder.control('', Validators.required));
      this.userForm.addControl('phone', this.formBuilder.control('', Validators.required));
      this.userForm.addControl('password_confirmation', this.formBuilder.control('', Validators.required));
      this.endpoint = 'http://127.0.0.1:8000/api/register'; // Endpoint para el registro
    } else {
      this.userForm.removeControl('name');
      this.userForm.removeControl('phone');
      this.userForm.removeControl('password_confirmation');
      this.endpoint = 'http://127.0.0.1:8000/api/login'; // Endpoint para el inicio de sesion
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Enviar la solicitud al servidor utilizando HttpClient
      this.http.post(this.endpoint, this.userForm.value)
      .subscribe((response: any) => {
        console.log('Respuesta del servidor:', response);
        // Verificamos si la respuesta contiene errores
        if (response && Object.keys(response).length > 0) {
          // Reiniciamos el área de mensajes de error
          this.serverError = '';
    
          // Iteramos sobre las claves (campos del formulario) en la respuesta
          Object.keys(response).forEach((key: string) => {
            // Obtenemos los mensajes de error para el campo actual
            const errorMessages = response[key];
            
            // Mostramos cada mensaje de error en el área correspondiente
            errorMessages.forEach((errorMessage: string) => {
              this.serverError += `${key}: ${errorMessage}<br>`;
            });
          });
        } else {
          // Si no hay errores, limpiamos el área de mensajes de error
          this.serverError = '';
        }
      }, (error) => {
        console.error('Error al enviar la solicitud:', error);
        // Si ocurre un error en la solicitud HTTP, mostramos un mensaje genérico de error
        this.serverError = 'Error al enviar la solicitud al servidor';
      });

    } else {
      // Aquí manejas la lógica para los errores de validación, etc.
      console.log("No enviado")
    }
  }
}