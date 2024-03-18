import { Component } from '@angular/core';
import { NavbarDashComponent } from '../../../navbar-dash/navbar-dash.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-comentario',
  standalone: true,
  imports: [NavbarDashComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-comentario.component.html',
  styleUrl: './add-comentario.component.css'
})
export class AddComentarioComponent implements OnInit {
  comentarioForm: FormGroup;
  mensaje: string | null = null;
  allUsers: any[] = [];
  allProducts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.comentarioForm = this.formBuilder.group({
      comment: ['', Validators.required],
      user_id: ['', Validators.required],
      product_id: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.comentarioForm.valid) {
      const endpoint = `http://127.0.0.1:8000/api/comments/create`;
      const comentarioData = {
        comment: this.comentarioForm.value.comment,
        user_id: this.comentarioForm.value.user_id,
        product_id: this.comentarioForm.value.product_id,
        rating: this.comentarioForm.value.rating
      };
      console.log(comentarioData);
      this.http.post(endpoint, comentarioData).subscribe(
        (response: any) => {
          console.log('Comentario creado:', response);
          const userName = this.allUsers.find(user => user.id === comentarioData.user_id)?.name;
          const productName = this.allProducts.find(product => product.id === comentarioData.product_id)?.name;
          this.mensaje = `Comentario creado correctamente.`;
          this.comentarioForm.reset();
        },
        error => {
          console.error('Error al crear el comentario:', error);
          this.mensaje = 'Error al crear el comentario. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}