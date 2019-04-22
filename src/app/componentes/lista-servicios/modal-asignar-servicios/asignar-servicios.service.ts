import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignarServiciosService {
  
  
  constructor(private http:HttpClient) { }

 async obtenerClientes(){

    return await  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?').toPromise();
  }

 obtenerTrabajadoras() {

  return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/trabajadoras.json?');
}

async agregarBoleta(boletaGuardar) {

  return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/boletaCreada.json?', boletaGuardar).toPromise();
}


}
