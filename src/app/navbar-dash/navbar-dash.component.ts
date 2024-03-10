import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { createPopper, popper } from '@popperjs/core';


@Component({
  selector: 'app-navbar-dash',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navbar-dash.component.html',
  styleUrl: './navbar-dash.component.css'
})
export class NavbarDashComponent{
  constructor() { }


}
