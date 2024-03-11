import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-navbar-dash',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './navbar-dash.component.html',
  styleUrl: './navbar-dash.component.css'
})
export class NavbarDashComponent{
  constructor() { }


}
