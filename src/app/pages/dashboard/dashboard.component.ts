import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../navbar-dash/navbar-dash.component';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarDashComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
