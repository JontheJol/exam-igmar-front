import { Component } from '@angular/core';
import { DynamicTableComponent } from '../../../dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-compras',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, ReactiveFormsModule, NavbarDashComponent, RouterModule],
  templateUrl: './edit-compras.component.html',
  styleUrl: './edit-compras.component.css'
})
export class EditComprasComponent {
  compraForm: FormGroup;
  compra: any;
  mensaje: string | null = null;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.compraForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      date: ['', [Validators.required]],
      total: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      user_id: ['', Validators.required],
      product_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const purchaseId = params['id'];
      this.obtenerCompra(purchaseId);
    });

    this.http.get<any>('http://127.0.0.1:8000/api/users').subscribe(
      (data: any) => {
        this.allUsers = data;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

    this.http.get<any>('http://127.0.0.1:8000/api/products').subscribe(
      (data: any) => {
        this.allProducts = data;
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerCompra(purchaseId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/purchases/${purchaseId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.compra = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la compra:', error);
        this.router.navigate(['dashboard/compras/']);
      }
    );
  }

  initializeForm(): void {
    if (this.compra) {
      console.log('Producto:', this.compra);
      this.compraForm.patchValue({
        quantity: this.compra.quantity,
        date: this.compra.date,
        total: this.compra.total,
        user_id: this.compra.user_id, 
        product_id: this.compra.product_id,
      });
    }
  }

  onSubmit(): void {
    if (this.compraForm.valid) {
      const shipmentId = this.compra.id;
      const endpoint = `http://127.0.0.1:8000/api/shipments/${shipmentId}/update`;
      const userData = this.compraForm.value; // Usar los valores del formulario
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Producto actualizado:', response);
          const userNames = this.allUsers.find(user => user.id === userData.user_id)?.name;
          const productName = this.allProducts.find(product => product.id === userData.product_id)?.name;
          this.mensaje = `Envio actualizado correctamente`;
        },
        error => {
          console.error('Error al actualizar el envio:', error);
          this.mensaje = 'Error al actualizar el envio. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
