import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmServiciosService {

  constructor(private http: HttpClient) { }

  obtenerServicios() {

    return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?');
  }

  obtenerCategorias() {

    return this.http.get<any[]>('https://devs-c9cdc.firebaseio.com/categorias.json?');

  }

  async agregarServicio(servicio) {

    return await this.http.post<any[]>('https://devs-c9cdc.firebaseio.com/servicios.json?', servicio).toPromise();

  }


  async eliminarServicio(servicio) {
  

   // var a = await this.http.get<any[]>(`https://devs-c9cdc.firebaseio.com/servicios.json?orderBy="descripcion"&equalTo="${servicio}"`).toPromise();

    return await this.http.delete<any[]>(`https://devs-c9cdc.firebaseio.com/servicios/${servicio}.json`).toPromise();
  }

  async editarServicio(servicio, id) {


    return await this.http.put<any[]>(`https://devs-c9cdc.firebaseio.com/servicios/${id}.json`, {
      "descripcion":servicio.descripcion,
      "categoria":servicio.categoria,
      "valor":servicio.valor
    }).toPromise();

  }

}
