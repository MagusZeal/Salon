import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardClientesService {
 
  constructor(private http:HttpClient) { }

  async obtenerClientes(){

    return await this.http.get<any[]>('clientes.json?').toPromise();
  }

  async obtenerJornadas(fechaInicio,fechaTermino){

    return await this.http.get<any[]>(`jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).toPromise();
    
  }
}
