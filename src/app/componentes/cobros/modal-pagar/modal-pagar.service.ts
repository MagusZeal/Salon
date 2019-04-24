import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalPagarService {

  constructor(private http: HttpClient) { }

  eliminarBoletaDia(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasDia/${boletaBorrar}.json?`);
  }

  eliminarBoletaReserva(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasReserva/${boletaBorrar}.json?`);
  }

  agregarJornada(fecha, boleta) {

    return  this.http.post<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fecha}.json?`, boleta);
  }
}
