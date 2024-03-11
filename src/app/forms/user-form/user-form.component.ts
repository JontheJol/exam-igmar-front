import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl } from '@angular/forms';
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
  serverSuccess: string = '';
  isLoading: boolean = false;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loginService.isRegistering$.subscribe((value) => {
      this.switchRegistrationMode(value);
    });
  }

  
// , Validators.pattern("^[0-9]{10}$")]
  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]], // Aquí se agrega Validators.pattern
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]]
    }
    , {
      validators: this.passwordMatchValidator // Agregamos el validador personalizado a nivel de formulario
    }
    );
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const password_confirmation = control.get('password_confirmation')?.value;
    if (password && password_confirmation && password !== password_confirmation) {
      return { 'passwordMismatch': true };
    }
    return null;
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
if (this.userForm.enabled){
    if (this.userForm.valid) {
    // if (true) {
      this.serverError = '';
      this.serverSuccess = '';
      // this.userForm.disable();
      this.isLoading = true;
      // console.log(this.userForm.value);
      // Enviar la solicitud al servidor utilizando HttpClient
      this.http.post(this.endpoint, this.userForm.value)
      .subscribe((response: any) => 
      {
        console.log('Respuesta del servidor:', response);

        //quiero que el mensaje que traiga el servidor se muestre en el html
        if (response && Object.keys(response).length > 0) {
          this.serverSuccess = '';
          Object.keys(response).forEach((key: string) => {
            console.log("aqui0")

            const errorMessages = response[key];
            if (Array.isArray(errorMessages)) {
              console.log("aqui1")
              errorMessages.forEach((errorMessage: string) => {
                this.serverSuccess += `${key}: ${errorMessage}<br>`;
              });
            } else if (typeof errorMessages === 'string') {
              this.serverSuccess += `${key}: ${errorMessages}<br>`;
            }
          });
          this.userForm.reset();
          // this.userForm.enable(); 
        } else {
          console.log("aqui3")

          this.serverSuccess = '';
        }

      this.userForm.enable();
      this.isLoading = false;

      }, (error) => {
        console.error('Error al enviar la solicitud:', error);
        // Si ocurre un error en la solicitud HTTP, mostramos un mensaje genérico de error
        // this.serverError = 'Error al enviar la solicitud al servidor';
        console.log("aquiiii")

        console.log(error)
        console.log(error.error)
        console.log(error.error.data.original)
          this.serverError = '';  
        Object.keys(error.error.data.original).forEach((key: string) => {
          const errorMessages = error.error.data.original[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((errorMessage: string) => {
              this.serverError += ` ${errorMessage} <hr>`;
              console.log(` ${errorMessage}`);
              console.log("aqui")
            });
          } else if (typeof errorMessages === 'string') {
            // Si errorMessages es una cadena, la añadimos directamente a this.serverError
            this.serverError += `${key}: ${errorMessages}<br>`;
            console.log("aqui2")

          }
        });
        

        if (error && error.error && error.error.message) {
          this.serverError = error.error.message;
        } else {
          // Si no hay un mensaje de error personalizado, mostramos un mensaje genérico de error
          // this.serverError = 'Error al enviar la solicitud al servidor';
        }

      this.userForm.enable();
      this.isLoading = false;
      });

    } else {
      console.log("Errores:")
      console.log(this.userForm.controls)
      console.log(this.userForm.value);

      
      console.log("No enviado")
    }
  }
  }
}