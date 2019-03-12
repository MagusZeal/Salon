import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardClientesService {
 
  constructor(private http:HttpClient) { }

   obtenerClientes(){

    return  this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/clientes.json?');
  }

  async obtenerJornadas(fechaInicio,fechaTermino){

    return await this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas.json?orderBy="$key"&startAt="${fechaInicio}"&endAt="${fechaTermino}"`).toPromise();
    
  }
}
