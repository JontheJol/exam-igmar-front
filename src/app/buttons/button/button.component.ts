import { Component, Input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() route?: string;

  constructor(private router: Router) {}

  navigateToRoute() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
