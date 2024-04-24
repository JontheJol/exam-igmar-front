import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verificar-codigo',
  standalone: true,
  templateUrl: './verificar-codigo.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./verificar-codigo.component.css']
})


export class VerificarCodigoComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private location: Location, private http: HttpClient, private router: Router) { }

  codigoVerificacion!: string;
  token!: string;

  email!: string;
  contrasena!: string;


  ngOnInit() {
    const state = this.location.getState() as { email?: string, contrasena?: string };
    console.log("en verificar codigo")

    if (state) {
      this.email = state.email ?? '';
      this.contrasena = state.contrasena ?? '';
    }
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      codigoVerificacion: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }


  onSubmit() {

    const data = {
      codigoVerificacion: this.token,
       nombre: this.email,
       contrasena: this.contrasena
    };
    console.log(data);

    this.http.post( 'https://1d45-2806-101e-d-a299-8cdf-231a-3509-a0a7.ngrok-free.app/api/auth', data, { observe: 'response' })
    .subscribe((response: any) =>
    {
      console.log(response);

  }, (error) => {
    console.log(error);
  }
  );



  }

}
