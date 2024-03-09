import { Component } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';


@Component({
  selector: 'app-navbar-dash',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navbar-dash.component.html',
  styleUrl: './navbar-dash.component.css'
})
export class NavbarDashComponent {

}
