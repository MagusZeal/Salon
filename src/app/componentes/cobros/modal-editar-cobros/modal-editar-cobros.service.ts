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

  async editarBoleta(boleta, id){

    return await this.http.put<any[]>(`https://devs-c9cdc.firebaseio.com/boletaCreada/${id}.json?`,boleta).toPromise();
     
   }

  async obtenerClientes(){

    return await  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?').toPromise();
  }

 obtenerTrabajadoras() {

  return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/trabajadoras.json?');
}



}
