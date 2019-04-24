import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoletaReservasFuturasService {

  constructor(private http: HttpClient) { }

  async obtenerBoletas() {
    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/boletasReserva.json?').toPromise();
  }

  eliminarBoleta(boletaBorrar) {
    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasReserva/${boletaBorrar}.json?`);
  }
}
