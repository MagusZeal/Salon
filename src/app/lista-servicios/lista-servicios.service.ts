import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListaServiciosService {

  constructor(private http:HttpClient) { }

  async obtenerCategorias(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/categorias.json?').toPromise();
    
  }

  async obtenerServicios(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?').toPromise();
  }

  async obtenerTrabajadoras(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/trabajadoras.json?').toPromise();
  }

  async obtenerClientes(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?').toPromise();
  }

  async agregarBoleta(boletaGuardar){

   return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/boletaCreada.json?',boletaGuardar).toPromise();
  }

  async agregarCliente(cliente){

   return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?',cliente).toPromise();
    
  }

}
