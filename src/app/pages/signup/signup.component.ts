import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent, UserFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.setIsRegistering(true); // Asegúrate de que estás en modo de registro al cargar la página
  }

  switchToLogin(): void {
    this.loginService.setIsRegistering(false);
  }
}
