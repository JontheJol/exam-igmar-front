import { Component } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
