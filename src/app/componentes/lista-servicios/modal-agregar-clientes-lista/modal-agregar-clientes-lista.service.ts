import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalAgregarClientesListaService {

  constructor(private http:HttpClient) { }

  async obtenerClientes(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?').toPromise();
  }

  async agregarCliente(cliente){

    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?',cliente).toPromise();
     
   }


}
