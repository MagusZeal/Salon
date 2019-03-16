import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(private http:HttpClient) { }

async obtenerJornada(fechaActual){

    return await this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fechaActual}.json?`).toPromise();
    
  }

  eliminarBoleta(fechaCaja,boletaBorrar){
 
    return  this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/jornadas/${fechaCaja}/${boletaBorrar}.json?`);
  }

}
