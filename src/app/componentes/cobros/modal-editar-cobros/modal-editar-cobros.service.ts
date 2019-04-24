import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalEditarCobrosService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {

    return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/categorias.json?');

  }

 async obtenerServicios() {

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?').toPromise();
  }

  async agregarBoletaDia(boletaGuardar) {

    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/boletasDia.json?', boletaGuardar).toPromise();
  }
  async agregarBoletaReserva(boletaGuardar) {
  
    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/boletasReserva.json?', boletaGuardar).toPromise();
  }
  
  eliminarBoletaDia(boletaBorrar) {
    
    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasDia/${boletaBorrar}.json?`);
  }
  eliminarBoletaReserva(boletaBorrar) {

    return this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/boletasReserva/${boletaBorrar}.json?`);
  }
  async obtenerClientes(){

    return await  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?').toPromise();
  }

 obtenerTrabajadoras() {

  return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/trabajadoras.json?');
}



}
