import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LoginService } from '../../login.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Validator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameComponent } from '../../pages/game/game.component';



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
  email: any;
  contrasena: any;
  isRegistering: boolean | undefined;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private http: HttpClient, private cookieService: CookieService, private router: Router ) { }
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
      password_confirmation: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
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
            this.userForm.removeControl('code');
            this.isRegistering = true;
      this.endpoint = 'http://127.0.0.1:8000/api/register'; // Endpoint para el registro
    } else {
      this.userForm.removeControl('name');
      this.userForm.removeControl('phone');
      this.userForm.removeControl('password_confirmation');
      this.userForm.removeControl('code');
      this.isRegistering = false;

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
        console.log(response);
        if (response.status === 200) { // Si el servidor responde con un status 200, osea que llego pero es un error
          if (response.body.mensaje.original) {
            for (const key in response.body.mensaje.original) {
              if (Array.isArray(response.body.mensaje.original[key])) {
                this.serverError += ` ${response.body.mensaje.original[key]} <hr>`;
              }
            }
          }
          else if (response.body.mensaje) {
            this.serverError += response.body.mensaje;

          }

        }
        else if (response.status === 202)
        {
          console.log(response.body);
          // if (!Array.isArray(response.body.mensaje)) { //para el login
          if (response.body.token) { //para el login 2

            this.serverSuccess += "Bienvenido!";
            // this.cookieService.set('token', response.body.token);
            document.cookie = `authToken=${response.body.token}`;

            this.router.navigate(['/landing']);

          }
          else if (Array.isArray(response.body.mensaje) && this.isRegistering == true)
          { //para el registro
          for (const key in response.body.data.mensaje) {
            if (Array.isArray(response.body.data.mensaje[key])) {
              this.serverSuccess += ` ${response.body.data.original[key]} <hr>`;
            }
          }

        }
        else if (!Array.isArray(response.body.mensaje) )
        {
          this.serverSuccess += response.body.mensaje;
          if (this.isRegistering == false){
          this.serverSuccess += "<hr> Porfavor ingrese codigo enviado al correo..."
          this.email = this.userForm.value.email;
          this.contrasena = this.userForm.value.password;
          setTimeout(() => {
            // this.router.navigate(['/verificar'], { state: { nombre: this.email, contrasena: this.contrasena } });
            // this.userForm.addControl('codigoVerificacion', this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]));
            this.userForm.addControl('code', this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]));
            this.isLoading = false;
            this.endpoint = 'http://127.0.0.1:8000/api/auth';
          }, 2000);
        }
        }

        }
      }, (error) => {
        console.log(error.response);
        this.serverError = 'Error al enviar la solicitud, intente mas tarde';
        this.userForm.enable();
        this.isLoading = false;

  console.error('Error al enviar la solicitud:', error);
      },
      () => {
        // Este código se ejecutará cuando el Observable se complete (es decir, después de que la solicitud HTTP tenga éxito o falle)
        console.log('La solicitud ha terminado');
        this.userForm.enable();
        this.isLoading = false;

      });
    } else {
        this.serverError = 'Por favor, complete el formulario correctamente';
    }

  }
  }

  clearMessages(): void {
  this.serverError = '';
  this.serverSuccess = '';
}
}
