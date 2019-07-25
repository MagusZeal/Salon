import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

  async obtenerJornada(fechaActual) {

    return await this.http.get<any[]>(`jornadas/${fechaActual}.json?`).toPromise();

  }
  async obtenerBoletasDia() {

    return this.http.get<any[]>('boletasDia.json?').toPromise();
  }

  async obtenerBoletasReserva() {

    return await this.http.get<any[]>('boletasReserva.json?').toPromise();
  }
  
  eliminarBoletasDia(boletaBorrar) {

    return this.http.delete<any[]>(`boletasDia/${boletaBorrar}.json?`);
  }
  eliminarBoletasReserva(boletaBorrar) {

    return this.http.delete<any[]>(`boletasReserva/${boletaBorrar}.json?`);
  }

  eliminarBoleta(fechaCaja, boletaBorrar) {

    return this.http.delete<any[]>(`jornadas/${fechaCaja}/${boletaBorrar}.json?`);
  }

}
