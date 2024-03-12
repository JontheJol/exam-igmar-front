import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LoginService } from '../../login.service';
import { HttpClient } from '@angular/common/http';
import { Validator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


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


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient, private cookieService: CookieService ) { }
//el constructor es 
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
      this.userForm.disable();
      this.isLoading = true; 
      
      // this.http.post(this.endpoint, this.userForm.value)
      this.http.post(this.endpoint, this.userForm.value, { observe: 'response' })
      .subscribe((response: any) => 
      {
        // console.log('Respuesta del servidor:', response);
        console.log(response.status);
        console.log(response.body);
        console.log(response.body.mensaje);
        if (response.status === 200) { // Si el servidor responde con un status 200, osea que llego pero es un error 
          if (!response.body.mensaje.original) {
            this.serverError += response.body.mensaje;
          }
          for (const key in response.body.mensaje.original) {
            if (Array.isArray(response.body.mensaje.original[key])) {
              this.serverError += ` ${response.body.mensaje.original[key]} <hr>`;
            }
          }
        }
        else if (response.status === 202)  
        {
          if (!Array.isArray(response.body.data.mensaje)) {
            this.serverSuccess += response.body.mensaje;
          }
          for (const key in response.body.data.mensaje) {
            if (Array.isArray(response.body.data.mensaje[key])) {
              this.serverSuccess += ` ${response.body.data.original[key]} <hr>`;
            }
          }
        }

      }, (error) => { 
        this.serverError = 'Error al enviar la solicitud, intente mas tarde';
        this.userForm.enable();
        this.isLoading = false;

  console.error('Error al enviar la solicitud:', error);
      },
      () => {
        // Este código se ejecutará cuando el Observable se complete (es decir, después de que la solicitud HTTP tenga éxito o falle)
        console.log('La solicitud ha terminado');

      });
    } else {
        this.serverError = 'Por favor, complete el formulario correctamente';
    }

  }
  }
}