import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmClientesEditarService {

  constructor(private http: HttpClient) { }


  async editarCliente(cliente, id) {

    return await this.http.put<any[]>(`clientes/${id}.json?`, cliente).toPromise();

  }



}
