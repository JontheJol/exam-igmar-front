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
  selector: 'app-add-producto',
  standalone: true,
  imports: [NavbarDashComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent implements OnInit {
  productoForm: FormGroup;
  mensaje: string | null = null;
  allCategories: any[] = [];
  allPlatforms: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService

  ) {
    this.productoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      category_id: ['', Validators.required],
      platform_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/categories',{ headers: headers }).subscribe(
      (data: any) => {
        this.allCategories = data;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );

    this.http.get<any>('https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/platforms',{ headers: headers }).subscribe(
      (data: any) => {
        this.allPlatforms = data;
      },
      error => {
        console.error('Error al obtener las plataformas:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const endpoint = `https://6f6f-2806-101e-d-a299-c169-f1b5-8ce1-acf5.ngrok-free.app/api/products/create`;
      const userData = {
        name: this.productoForm.value.name,
        description: this.productoForm.value.description,
        price: this.productoForm.value.price,
        category_id: this.productoForm.value.category_id,
        platform_id: this.productoForm.value.platform_id
      };
      console.log(userData);

    const token = this.cookieService.get('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(endpoint, userData,{ headers: headers }).subscribe(
        (response: any) => {
          console.log('Producto creado:', response);
          const categoryNames = this.allCategories.find(category => category.id === userData.category_id)?.name;
          const platformName = this.allPlatforms.find(platform => platform.id === userData.platform_id)?.name;
          this.mensaje = `Producto creado correctamente.`;
          this.productoForm.reset();
        },
        error => {
          console.error('Error al crear el producto:', error);
          this.mensaje = 'Error al crear el producto. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
