import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private datoCompartido: any;

  constructor() {}

  setDato(dato: any) {
    this.datoCompartido = dato;
  }
  setDato2(dato: any) {
    this.datoCompartido = dato;
  }

  getDato() {
    return this.datoCompartido;
  }
  getDato2() {
    return this.datoCompartido;
  }
}
