import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalAgregarClientesListaService {

  constructor(private http:HttpClient) { }

  async obtenerClientes(){

    return await this.http.get<any[]>('clientes.json?').toPromise();
  }

  async agregarCliente(cliente){

    return await this.http.post<any[]>('clientes.json?',cliente).toPromise();
     
   }


}
