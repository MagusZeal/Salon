import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmClientesBorrarService {

  constructor(private http: HttpClient) { }

  async eliminarCliente(idCliente) { 
    return await this.http.delete<any[]>(`clientes/${idCliente}.json`).toPromise();
  }

}
