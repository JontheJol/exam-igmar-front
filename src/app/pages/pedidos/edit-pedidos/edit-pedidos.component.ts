import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-edit-pedidos',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, ReactiveFormsModule, NavbarDashComponent, RouterModule],
  templateUrl: './edit-pedidos.component.html',
  styleUrl: './edit-pedidos.component.css'
})
export class EditPedidosComponent {
  compraForm: FormGroup;
  compra: any;
  mensaje: string | null = null;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
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

    this.http.get<any>('http://127.0.0.1:8000/api/users', {headers: headers}).subscribe(
      (data: any) => {
        this.allUsers = data;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

    this.http.get<any>('http://127.0.0.1:8000/api/products', {headers: headers}).subscribe(
      (data: any) => {
        this.allProducts = data;
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );

    this.route.params.subscribe(params => {
      const purchaseId = params['id'];
      this.obtenerPedido(purchaseId);
    });
  }

  obtenerPedido(orderId: number): void {
    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const endpoint = `http://127.0.0.1:8000/api/orders/${orderId}`;
    this.http.get<any>(endpoint, {headers: headers}).subscribe(
      (data: any) => {
        this.compra = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener el pedido:', error);
        this.router.navigate(['dashboard/pedidos/']);
      }
    );
  }

  initializeForm(): void {
    if (this.compra) {
      console.log('Producto:', this.compra);
      this.compraForm.patchValue({
        date: this.compra.date,
        total: this.compra.total,
        user_id: this.compra.user_id 
      });
    }
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const orderId = this.compra.id;
      const endpoint = `http://127.0.0.1:8000/api/orders/${orderId}/update`;
      const userData = this.compraForm.value; // Usar los valores del formulario
      console.log(userData);
      const token = this.cookieService.get('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.put(endpoint, userData, {headers: headers}).subscribe(
        (response: any) => {
          console.log('Producto actualizado:', response);
          const userNames = this.allUsers.find(user => user.id === userData.user_id)?.name;
          const productName = this.allProducts.find(product => product.id === userData.product_id)?.name;
          this.mensaje = `Pedido actualizado correctamente`;
        },
        error => {
          console.error('Error al actualizar el envio:', error);
          this.mensaje = 'Error al actualizar el pedido. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
