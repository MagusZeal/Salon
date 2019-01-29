import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmServiciosService {

  constructor(private http:HttpClient) { }

  async obtenerServicios(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?').toPromise();
  }

  async obtenerCategorias(){

    return await this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/categorias.json?').toPromise();
    
  }

  async agregarServicio(servicio){

    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?',servicio).toPromise();
     
   }


  async eliminarServicio(servicio){
    console.log(servicio);
    
   var a = await this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/servicios.json?orderBy="descripcion"&equalTo="${servicio}"`).toPromise();
  
    return await this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/servicios/${Object.keys(a)[0]}.json`).toPromise();
  }

}
