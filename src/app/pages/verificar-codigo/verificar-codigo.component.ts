import { Component } from '@angular/core';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.css']
})
export class VerificarCodigoComponent {
  token!: string;

  onSubmit() {
    // Aquí puedes manejar la lógica de verificación del token
    console.log(this.token);
  }
}