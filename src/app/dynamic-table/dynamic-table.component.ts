import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css'
})
export class DynamicTableComponent {
  constructor(private router: Router){}
  @Input() campos: string[] = [];
  @Input() datos: any[] = [];
  @Input() botonesAccion: { nombre: string, accion: Function, routerLink?: any[], clase?: string }[] = [];
}
