import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CobrosPendientesService {

  constructor(private http:HttpClient) { }

  obtenerBoletas(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/boletaCreada.json?');
    
  }

   eliminarBoleta(boletaBorrar){

    return  this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletaCreada/${boletaBorrar}.json?`);
  }

  async agregarJornada(fecha, boleta){

    return await this.http.post<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fecha}.json?`,boleta).toPromise();
   }

}
