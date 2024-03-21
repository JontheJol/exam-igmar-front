import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-navbar-dash',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './navbar-dash.component.html',
  styleUrl: './navbar-dash.component.css'
})
export class NavbarDashComponent{
  $authService = true;

  constructor(private cookieService: CookieService) { }
  
  salir() {
    this.cookieService.deleteAll();
    console.log('Saliendo...');
  }
}
