import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoletaReservaDiaService {

  constructor(private http: HttpClient) { }

  async obtenerBoletas() {

    return await this.http.get<any[]>('boletasReserva.json?').toPromise();
  }

  eliminarBoleta(boletaBorrar) {
console.log('a');

    return this.http.delete<any[]>(`boletasReserva/${boletaBorrar}.json?`);
  }
}
