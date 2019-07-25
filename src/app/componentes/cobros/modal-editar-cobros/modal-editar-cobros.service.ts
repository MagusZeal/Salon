import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalEditarCobrosService {

  constructor(private http: HttpClient) { }

  obtenerCategorias() {

    return this.http.get<any[]>('categorias.json?');

  }

 async obtenerServicios() {

    return await this.http.get<any[]>('servicios.json?').toPromise();
  }

  async agregarBoletaDia(boletaGuardar) {

    return await this.http.post<any[]>('boletasDia.json?', boletaGuardar).toPromise();
  }
  async agregarBoletaReserva(boletaGuardar) {
  
    return await this.http.post<any[]>('boletasReserva.json?', boletaGuardar).toPromise();
  }
  
  eliminarBoletaDia(boletaBorrar) {
    
    return this.http.delete<any[]>(`boletasDia/${boletaBorrar}.json?`);
  }
  eliminarBoletaReserva(boletaBorrar) {

    return this.http.delete<any[]>(`boletasReserva/${boletaBorrar}.json?`);
  }
  async obtenerClientes(){

    return await  this.http.get<any[]>('clientes.json?').toPromise();
  }

 obtenerTrabajadoras() {

  return this.http.get<any[]>('trabajadoras.json?');
}



}
