import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../navbar-dash/navbar-dash.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarDashComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
