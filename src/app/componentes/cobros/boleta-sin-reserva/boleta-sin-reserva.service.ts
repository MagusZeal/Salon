import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BoletaSinReservaService {

  constructor(private http: HttpClient) { }

  async obtenerBoletas() {
   
    return  this.http.get<any[]>('boletasDia.json?').toPromise();
  }

  eliminarBoleta(boletaBorrar) {

    return this.http.delete<any[]>(`boletasDia/${boletaBorrar}.json?`);
  }
}
