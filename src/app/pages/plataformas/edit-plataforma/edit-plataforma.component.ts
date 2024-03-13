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
  selector: 'app-edit-plataforma',
  standalone: true,
  imports: [DynamicTableComponent, CommonModule, ReactiveFormsModule, NavbarDashComponent, RouterModule],
  templateUrl: './edit-plataforma.component.html',
  styleUrl: './edit-plataforma.component.css'
})
export class EditPlataformaComponent {
  plataformaForm: FormGroup;
  plataforma: any;
  mensaje: string | null = null; // Inicialmente no hay mensaje

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.plataformaForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.obtenerPlataforma(categoryId);
    });
    this.plataformaForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  });
  }

  obtenerPlataforma(plataformaId: number): void {
    const endpoint = `http://127.0.0.1:8000/api/platforms/${plataformaId}`;
    this.http.get<any>(endpoint).subscribe(
      (data: any) => {
        this.plataforma = data;
        this.initializeForm();
      },
      error => {
        console.error('Error al obtener la plataforma:', error);
        this.router.navigate(['dashboard/plataformas/']);
      }
    );
  }

  initializeForm(): void {
    if (this.plataforma) {
      this.plataformaForm.patchValue({
        name: this.plataforma.name,
      });
    }
  }

  onSubmit(): void {
    if (this.plataformaForm.valid) {
      const platformId = this.plataforma.id;
      const endpoint = `http://127.0.0.1:8000/api/platforms/${platformId}/update`;
      const userData = {
        name: this.plataformaForm.value.name,
      };
      console.log(userData);
      this.http.put(endpoint, userData).subscribe(
        (response: any) => {
          console.log('Categoria actualizada:', response);
          this.mensaje = 'Categoria actualizada correctamente.';
        },
        error => {
          console.error('Error al actualizar categoria:', error);
          this.mensaje = 'Error al actualizar categoria. Por favor, inténtalo de nuevo.';
        }
      );
    }
  }
}
