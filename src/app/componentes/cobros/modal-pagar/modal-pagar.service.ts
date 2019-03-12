import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalPagarService {

  constructor(private http: HttpClient) { }

  eliminarBoleta(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletaCreada/${boletaBorrar}.json?`);
  }

  async agregarJornada(fecha, boleta) {

    return await this.http.post<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fecha}.json?`, boleta).toPromise();
  }
}
