import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalVerClienteService {

   
  constructor(private http:HttpClient) { }

  async obtenerClientes(){

    return await this.http.get<any[]>('clientes.json?').toPromise();
  }

}
