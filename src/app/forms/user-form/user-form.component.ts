import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent implements OnInit{
  userForm!: FormGroup;
  isRegistering: boolean = true; // Cambiar flag  a false si estamos en inicio de sesion

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Inicializr el form con campos default (comunes)
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.switchToRegistration();
  }

  switchToRegistration() {
    this.isRegistering = true;
    this.userForm.addControl('name', this.formBuilder.control('', Validators.required));
  }

  switchToLogin() {
    this.isRegistering = false;
    this.userForm.removeControl('name');
  }

  onSubmit() {
    if (this.userForm.valid) {
      // TODO: Manejr el registro o login del usuario segun sea el caso
      console.log(this.userForm.value);
    } else {
      // TODO: Mensajes de error, rechazo de validciones etc
    }
  }

}
