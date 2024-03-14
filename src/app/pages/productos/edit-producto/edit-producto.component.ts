import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [NavbarDashComponent,CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent{
  productoForm: FormGroup;
  producto: any;
  mensaje: string | null = null;
  allCategories: any[] = [];
  allPlatforms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.productoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      categories: [[]],
      platforms: [[]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.obtenerProducto(productId);
    });

    this.http.get<any>('http://127.0.0.1:8000/api/categories').subscribe(
      (data: any) => {
        this.allCategories = data;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );

    this.http.get<any>('http://127.0.0.1:8000/api/platforms').subscribe(
      (data: any) => {
        this.allPlatforms = data;
      },
      error => {
        console.error('Error al obtener las plataformas:', error);
      }
    );
  }

  obtenerProducto(productId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/products/${productId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.producto = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener el producto:', error);
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
        categories: this.producto.categories.map((category: any) => category.id),
        platforms: this.producto.platforms.map((platform: any) => platform.id)
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
        categories: this.productoForm.value.categories,
        platforms: this.productoForm.value.platforms
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Producto actualizado:', response);
          const categoryNames = this.allCategories.filter(category => userData.categories.includes(category.id)).map(category => category.name).join(', ');
          const platformNames = this.allPlatforms.filter(platform => userData.platforms.includes(platform.id)).map(platform => platform.name).join(', ');
          this.mensaje = `Producto actualizado correctamente. Categorías: ${categoryNames}, Plataformas: ${platformNames}`;
        },
        error => {
          console.error('Error al actualizar el producto:', error);
          this.mensaje = 'Error al actualizar el producto. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
