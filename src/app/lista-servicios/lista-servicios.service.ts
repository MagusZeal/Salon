import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListaServiciosService {

  constructor(private http:HttpClient) { }

 obtenerCategorias(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/categorias.json?');
    
  }

  obtenerServicios(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?');
  }

  
  obtenerTrabajadoras(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/trabajadoras.json?');
  }

  obtenerClientes(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?');
  }

  async agregarBoleta(boletaGuardar){

   return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/boletaCreada.json?',boletaGuardar).toPromise();
  }

  async agregarCliente(cliente){

   return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?',cliente).toPromise();
    
  }

}
