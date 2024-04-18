import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-envios',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-envios.component.html',
  styleUrl: './add-envios.component.css'
})
export class AddEnviosComponent {
  envioForm: FormGroup;
  mensaje: string | null = null;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.envioForm = this.formBuilder.group({
      state: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      address: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      user_id: ['', Validators.required],
      product_id: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
  }

  ngOnInit(): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/users', {headers: headers}).subscribe(
      (data: any) => {
        this.allUsers = data;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/products', {headers: headers}).subscribe(
      (data: any) => {
        this.allProducts = data;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.envioForm.valid) {
      const endpoint = `https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/shipments/create`;
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const userData = {
        state: this.envioForm.value.state,
        city: this.envioForm.value.city,
        address: this.envioForm.value.address,
        user_id: this.envioForm.value.user_id,
        product_id: this.envioForm.value.product_id,
        postal_code: this.envioForm.value.postal_code
      };
      console.log(userData);
      this.http.post(endpoint, userData, {headers: headers}).subscribe(
        (response: any) => {
          console.log('Envio creado:', response);
          const categoryNames = this.allUsers.find(user => user.id === userData.user_id)?.name;
          const platformName = this.allProducts.find(product => product.id === userData.product_id)?.name;
          this.mensaje = `Envio creado correctamente.`;
          this.envioForm.reset();
        },
        error => {
          console.error('Error al crear el envio:', error);
          this.mensaje = 'Error al crear el envio. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
