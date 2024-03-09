import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../buttons/button/button.component';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, ButtonComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.LoginService.isRegistering$.subscribe((value) => {
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
    } else {
      this.userForm.removeControl('name');
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Aquí manejas el registro o inicio de sesión según corresponda
    } else {
      // Aquí manejas la lógica para los errores de validación, etc.
    }
  }
}