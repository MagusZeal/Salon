import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignarServiciosService {
  
  
  constructor(private http:HttpClient) { }

 async obtenerClientes(){

    return await  this.http.get<any[]>('clientes.json?').toPromise();
  }

 obtenerTrabajadoras() {

  return this.http.get<any[]>('trabajadoras.json?');
}

async agregarBoletaDia(boletaGuardar) {

  return await this.http.post<any[]>('boletasDia.json?', boletaGuardar).toPromise();
}
async agregarBoletaReserva(boletaGuardar) {

  return await this.http.post<any[]>('boletasReserva.json?', boletaGuardar).toPromise();
}



}
