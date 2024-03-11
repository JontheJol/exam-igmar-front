import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent {
  @Input() campos: string[] = [];
  @Input() datos: any[] = [];
  @Input() botonesAccion: { nombre: string, accion: Function }[] = [];
}
