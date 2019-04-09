import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmClientesAgregarService {

  constructor(private http:HttpClient) { }

  async agregarCliente(cliente){

    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?',cliente).toPromise();
     
   }


   
}
