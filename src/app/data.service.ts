import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private datoCompartido: any;
  private datoCompartido2: any;
  private datoCompartido3: any;

  constructor() {}

  setDato1(dato: any) {
    this.datoCompartido = dato;
  }
  setDato2(dato: any) {
    this.datoCompartido2 = dato;
  }
  setDato3(dato: any) {
    this.datoCompartido3 = dato;
  }

  getDato1() {
    return this.datoCompartido;
  }
  getDato2() {
    return this.datoCompartido2;
  }
  getDato3() {
    return this.datoCompartido3;
  }
}
