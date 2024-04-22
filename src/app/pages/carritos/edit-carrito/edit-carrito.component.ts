import { Component, OnInit } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-carrito',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-carrito.component.html',
  styleUrl: './edit-carrito.component.css'
})
export class EditCarritoComponent implements OnInit {
  carritoForm: FormGroup;
  carrito: any;
  mensaje: string | null = null;
  isDisabled: boolean = true;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.carritoForm = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      user_name: [{ value: ''}, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      product_id: ['', [Validators.required]],
      product_name: [{value:''}, [Validators.required,Validators.minLength(4)]],
      quantity: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carritoId = params['id'];
      this.obtenerCarrito(carritoId);
    });

    this.http.get<any>('http://127.0.0.1:8000/api/users/').subscribe(
      (data: any) => {
        this.allUsers = data;
      },
      error => {
        console.error('Error al obtener los usuarios:', error);
      }
    );

    this.http.get<any>('http://127.0.0.1:8000/api/products/').subscribe(
      (data: any) => {
        this.allProducts = data;
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  obtenerCarrito(carritoId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/carts/${carritoId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.carrito = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener el carrito:', error);
        this.router.navigate(['dashboard/carritos/carritos']); // Corregido el redireccionamiento
      }
    );
  }

  initializeForm(): void {
    if (this.carrito) {
    console.log('Carrito:', this.carrito);
    this.carritoForm.patchValue({
      user_id: this.carrito.user_id,
      product_id: this.carrito.product_id,
      quantity: this.carrito.quantity
    })
    }
  }

  onSubmit(): void {
    if (this.carritoForm.valid && this.carrito && this.carrito.product_id) {
      const comentarioId = this.carrito.id;
      const endpoint = `http://127.0.0.1:8000/api/carts/${comentarioId}/update`;
      const userData = {
        user_id: this.carritoForm.value.user_id,
        product_id: this.carrito.product_id,
        quantity: this.carritoForm.value.quantity,
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Comentario actualizado:', response);
          this.mensaje = 'Comentario actualizado correctamente.';
        },
        error => {
          console.error('Error al actualizar comentario:', error);
          this.mensaje = 'Error al actualizar comentario. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
