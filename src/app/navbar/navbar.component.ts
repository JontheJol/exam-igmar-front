import { Component } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet, RouterLink, RouterLinkActive, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rutasConNavbar: string[] = ['', '/ingreso', '/registro']; // Rutas en las que se muestr ala navbar default

  constructor(private router: Router) {}

  mostrarNavbar(): boolean {
    const rutaActual = this.router.url;
    return this.rutasConNavbar.includes(rutaActual);
  }
}
