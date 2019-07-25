import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmTrabajadorasService {

  constructor(private http:HttpClient) { }

 obtenerTrabajadoras(){

    return  this.http.get<any[]>('trabajadoras.json?');
  }
  obtenerCategorias(){

    return  this.http.get<any[]>('categorias.json?');
  }

  
   async editarTrabajadora(trabajadora, id){

    return await this.http.put<any[]>(`trabajadoras/${id}.json?`,trabajadora).toPromise();
     
   }

}
