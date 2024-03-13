import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-categoria',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.css'
})
export class EditProductoComponent implements OnInit {
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

  obtenerProducto(productoId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/products/${productoId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.producto = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la categoria:', error);
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
      const productoId = this.producto.id;
      const endpoint = `http://127.0.0.1:8000/api/products/${productoId}/update`;
      const userData = {
        name: this.productoForm.value.name,
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Producto actualizado:', response);
          this.mensaje = 'Producto actualizado correctamente.';
        },
        error => {
          console.error('Error al actualizar producto:', error);
          this.mensaje = 'Error al actualizar producto. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
