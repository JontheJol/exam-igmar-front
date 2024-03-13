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
  selector: 'app-edit-producto',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, ReactiveFormsModule, NavbarDashComponent, RouterModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent {
  productoForm: FormGroup;
  producto: any;
  mensaje: string | null = null; // Inicialmente no hay mensaje

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productoForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.obtenerProducto(productId);
    });
    this.productoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  });
  }

  obtenerProducto(productId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/products/${productId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.producto = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la plataforma:', error);
        this.router.navigate(['dashboard/productos/']);
      }
    );
  }

  initializeForm(): void {
    if (this.producto) {
      this.productoForm.patchValue({
        name: this.producto.name,
        description: this.producto.description,
        price: this.producto.price,
      });
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const productId = this.producto.id;
      const endpoint = `http://127.0.0.1:8000/api/products/${productId}/update`;
      const userData = {
        name: this.productoForm.value.name,
        description: this.productoForm.value.description,
        price: this.productoForm.value.price,
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Producto actualizada:', response);
          this.mensaje = 'Producto actualizada correctamente.';
        },
        error => {
          console.error('Error al actualizar Producto:', error);
          this.mensaje = 'Error al actualizar Producto. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
