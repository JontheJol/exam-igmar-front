import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { LoginService } from '../../login.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UserFormComponent, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.setIsRegistering(false);
  }

  switchToLogin(): void {
    this.loginService.setIsRegistering(false);
  }
}
