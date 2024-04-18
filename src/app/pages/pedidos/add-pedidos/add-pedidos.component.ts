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
  selector: 'app-add-pedidos',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-pedidos.component.html',
  styleUrl: './add-pedidos.component.css'
})
export class AddPedidosComponent {
  compraForm: FormGroup;
  mensaje: string | null = null;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.compraForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      total: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      user_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Solicitud para obtener usuarios
    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/users', { headers: headers }).subscribe(
        (data: any) => {
            this.allUsers = data;
        },
        error => {
            console.error('Error al obtener los usuarios:', error);
        }
    );

    // Solicitud para obtener productos
    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/products', { headers: headers }).subscribe(
        (data: any) => {
            this.allProducts = data;
        },
        error => {
            console.error('Error al obtener los productos:', error);
        }
    );
}

  onSubmit(): void {
    if (this.compraForm.valid) {
      const endpoint = `https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/orders/create`;
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const userData = {
        date: this.compraForm.value.date,
        total: this.compraForm.value.total,
        user_id: this.compraForm.value.user_id,
        product_id: this.compraForm.value.product_id
      };
      console.log(userData);
      this.http.post(endpoint, userData, {headers: headers}).subscribe(
        (response: any) => {
          console.log('Envio creado:', response);
          const categoryNames = this.allUsers.find(user => user.id === userData.user_id)?.name;
          const platformName = this.allProducts.find(product => product.id === userData.product_id)?.name;
          this.mensaje = `Pedido creado correctamente.`;
          this.compraForm.reset();
        },
        error => {
          console.error('Error al crear el envio:', error);
          this.mensaje = 'Error al crear el  pedido. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
