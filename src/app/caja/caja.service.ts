import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http: HttpClient) { }

  async obtenerJornada(fechaActual) {

    return await this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fechaActual}.json?`).toPromise();

  }
  async obtenerBoletasDia() {

    return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/boletasDia.json?').toPromise();
  }

  async obtenerBoletasReserva() {

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/boletasReserva.json?').toPromise();
  }
  
  eliminarBoletasDia(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasDia/${boletaBorrar}.json?`);
  }
  eliminarBoletasReserva(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasReserva/${boletaBorrar}.json?`);
  }

  eliminarBoleta(fechaCaja, boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fechaCaja}/${boletaBorrar}.json?`);
  }

}
