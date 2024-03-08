import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UserFormComponent } from '../../forms/user-form/user-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent, UserFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
}
