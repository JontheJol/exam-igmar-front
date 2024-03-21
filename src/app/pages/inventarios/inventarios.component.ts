import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TokenService  } from '../../token.service';
import { NavbarDashComponent } from '../../navbar-dash/navbar-dash.component';
import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
import { CommonModule  } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Asegúrate de tener una referencia al modal en tu componente

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [NavbarDashComponent, DynamicTableComponent, CommonModule, RouterModule, NgbModule, FormsModule],
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.css'
})


export class InventariosComponent implements OnInit {
  @ViewChild('content')
  content!: TemplateRef<any>;
  
  campos: string[] = ['nombre', 'cantidad'];
  datos: any[] = [];
  botonesAccion: { nombre: string, accion: Function, routerLink?: string, clase?: string }[] = [
    { nombre: 'Editar', accion: (producto: { id: string }) => this.editarProducto(producto), clase: 'btn-editar' },
    { nombre: 'Eliminar', accion: (producto: any) => this.eliminarProducto(producto), clase: 'btn-eliminar' },
    // Agrega más botones aquí
  ];
  selectedId: string = '';
  cantity: number = 0;
  productosName: {name: string, id: string}[] = [];
  productoParaEditar: any;

  constructor(private inventarioService: TokenService, private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenertabla();

    
  }

  obtenertabla () {
    this.inventarioService.getRequestWithToken('http://localhost:8000/api/inventories/index').subscribe((response: any) => {
      this.datos = response.data;
      console.log(response)
    });
  }


  open(content: any) {
    // console.log('getInventoryData');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // console.log('Modal cerrado1');
    }, (reason) => {
      if (reason === 'Save click') {
        const datos = {
          product_id: this.selectedId,
          quantity: this.cantity
        };
        this.inventarioService.sendRequestWithToken('http://localhost:8000/api/inventories/store' , datos).subscribe((response: any) => {
          console.log(response);
          alert('Operación exitosa');
        },
        (error: any) => {
          alert('Error al insertar el producto');
          console.log(error);
        }
        );
      }
    });
          this.inventarioService.getRequestWithToken('http://localhost:8000/api/products/').subscribe((response: any) => {
        console.log(response);
        this.productosName = response.map((producto: any) => ({
              name: producto.name,
              id: producto.id
            }));
          });
  }


    editarProducto(producto:  any) {
  console.log("--------------------")

      console.log(producto); //quiero que estos datos se pongan en el modal para editar
      this.selectedId = producto.id;
      this.cantity = producto.cantidad;
      this.productosName = [{name: producto.nombre, id: producto.id}];

      this.modalService.open(this.content , {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      }, (reason) => {
        if (reason === 'Save click') {
          const datos = {
            quantity: this.cantity
          };
          this.inventarioService.updateRequestWithToken(`http://localhost:8000/api/inventories/${producto.id}/update`, datos).subscribe((response: any) => {
            console.log(response);
            alert('Producto editado con éxito');
            this.obtenertabla();
          },
          (error: any) => {
            alert('Error al editar el producto');
            console.log(error);
          });
        }
      });
    }

    eliminarProducto(producto: { id: string }): void {
      this.inventarioService.deleteRequestWithToken(`http://localhost:8000/api/inventories/${producto.id}/deactivate`, {}).subscribe(
        (response: any) => {
          // console.log(response);
          alert('Producto eliminado con éxito');
          this.obtenertabla();

        },
        (error: any) => {
          console.error(error);
          alert('Error al eliminar el producto');
        }
      );
    };
    
    updateSelectedId(value: string) {
      this.selectedId = value;
    }
  }
  