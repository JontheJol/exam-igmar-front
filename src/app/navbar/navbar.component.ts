import { Component } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
