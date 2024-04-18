import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ButtonComponent } from './buttons/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent, ButtonComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'balistic side eye';
}
